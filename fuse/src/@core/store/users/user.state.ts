import { Action, Selector, State, StateContext, NgxsOnInit } from '@ngxs/store';
import { asapScheduler, of } from 'rxjs';
import { User } from '@core/user/user.model';
import { UsersStateModel } from './users.state.model';
import * as usersActions from './users.actions';
import { UserService } from '@core/user/user.service';
import { TokenAuthService } from '@core/auth/tokenAuth.service';
import { catchError } from 'rxjs/operators';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { UtilsService } from '../../utils/utils.service';

@State<UsersStateModel>({
    name: 'users',
    defaults: {
        users: [],
        loaded: false,
        loading: false,
    }
  })

export class UsersState implements NgxsOnInit {
    constructor(private _userService: UserService,
                private _tokenService: TokenAuthService,
                private _utils: UtilsService) {}
    ngxsOnInit(ctx: StateContext<UsersStateModel>) {
        ctx.dispatch(new usersActions.LoadUsers());
    }

    @Selector()
    static allUsers(state: UsersStateModel) {
        return state.users;
    }

    @Action(usersActions.LoadUsers)
    loadUsers({ patchState, dispatch }: StateContext<UsersStateModel>) {
        patchState({ loading: true });

        if(!this._tokenService.isAuthenticated()) {
            asapScheduler.schedule(() =>
                dispatch(new usersActions.LoadUsersFail("Unauthorized"))
            )
            return;
        }
        
        return this._userService.getUsers()
            .map((users: User[]) => {
                asapScheduler.schedule(() =>
                    dispatch(new usersActions.LoadUsersSuccess(users))
                )
            },
            catchError(error => 
                of(
                    asapScheduler.schedule(() =>
                    dispatch(new usersActions.LoadUsersFail(error)))
                )
            )
        );
    }

    @Action(usersActions.LoadUsersSuccess)
    loadUsersSuccess(
        { patchState }: StateContext<UsersStateModel>,
        { payload }: usersActions.LoadUsersSuccess 
    ) {
        patchState({ users: payload, loaded: true, loading: false});
    }

    @Action(usersActions.LoadUsersFail)
    loadUsersFail(
        { patchState } : StateContext<UsersStateModel>,
        { payload } : usersActions.LoadUsersFail
    ) {
        patchState({ loaded: false, loading: false });
    }

    @Action(usersActions.UserEventSignup)
    userEventSignup(
        { patchState, getState, dispatch }: StateContext<UsersStateModel>,
        { payload }: usersActions.UserEventSignup
    ) {
        const state = getState(); 
        let index = state.users.findIndex(x => x._id === payload.userId);

        if(index > -1) {
            patchState({ loaded: false, loading: true });
            let user = state.users[index];
            user = this._userService.preProcessUser(user);

            //add event
            //to ensure there are no duplicates, we will use a Set
            let idSet = new Set(user.events);
            idSet.add(payload.eventId);
            user.events = Array.from(idSet);

            return this._userService.update(user, true)
                .subscribe(data => {
                    asapScheduler.schedule(() => 
                       dispatch(new usersActions.UserEventSignupSuccess(data)) 
                    )
                },
                error => {
                    asapScheduler.schedule(() => 
                        dispatch(new usersActions.UserEventSignupFail(error.message))
                    )
                });
        } else {
            //failed
            asapScheduler.schedule(() => 
                dispatch(new usersActions.UserEventSignupFail("Failed to Update"))
            ) 
        }
    }

    @Action(usersActions.UserEventSignupSuccess)
    userEventSignupSuccess(
        { patchState, getState }: StateContext<UsersStateModel>,
        { payload }: usersActions.UserEventSignupSuccess 
    ) {
        const state = getState(); 
        let index = state.users.findIndex(x => x._id === payload._id);

        if(index > -1) {
            patchState({ 
                users: [...state.users.slice(0, index), 
                        payload, 
                        ...state.users.slice(index+1)],
                loaded: true, 
                loading: false });
        }
    }

    @Action(usersActions.UserEventSignupFail)
    userEventSignupFail(
        { patchState } : StateContext<UsersStateModel>,
        { payload } : usersActions.UserEventSignupFail
    ) {
        patchState({ loaded: false, loading: false });
        this._utils.error(payload);
    }


    @Action(usersActions.UserEventRemove)
    userEventRemove(
        { patchState, getState, dispatch }: StateContext<UsersStateModel>,
        { payload }: usersActions.UserEventRemove
    ) {
        const state = getState(); 
        let index = state.users.findIndex(x => x._id === payload.userId);

        if(index > -1) {
            patchState({ loaded: false, loading: true });
            let user = state.users[index];
            user = this._userService.preProcessUser(user);

            //Remove event if signed up
            let eventIndex = user.events.findIndex(x => x === payload.eventId);

            if(eventIndex > -1) {
                user.events.splice(eventIndex, 1);
                return this._userService.update(user, true)
                    .subscribe(data => {
                        asapScheduler.schedule(() => 
                            dispatch(new usersActions.UserEventRemoveSuccess(data)) 
                        )
                    },
                    error => {
                        asapScheduler.schedule(() => 
                            dispatch(new usersActions.UserEventRemoveFail(error.message))
                        )
                    });
            } else {
                //user is not signed up for that event, so he must be in a pending sate
                //in which case we don't need to update the user model.
                asapScheduler.schedule(() => 
                    dispatch(new usersActions.UserEventRemoveSuccess(null)) 
                )      
            }
        } else {
            //failed
            asapScheduler.schedule(() => 
                dispatch(new usersActions.UserEventRemoveFail("Failed to Update"))
            ) 
        }
    }


    @Action(usersActions.UserEventRemoveSuccess)
    userEventRemoveSuccess(
        { patchState, getState }: StateContext<UsersStateModel>,
        { payload }: usersActions.UserEventRemoveSuccess 
    ) {

        if(!payload) return;
        const state = getState(); 
        let index = state.users.findIndex(x => x._id === payload._id);

        if(index > -1) {
            patchState({ 
                users: [...state.users.slice(0, index), 
                        payload, 
                        ...state.users.slice(index+1)],
                loaded: true, 
                loading: false });
        }
    }

    @Action(usersActions.UserEventRemoveFail)
    userEventRemoveFail(
        { patchState } : StateContext<UsersStateModel>,
        { payload } : usersActions.UserEventRemoveFail
    ) {
        patchState({ loaded: false, loading: false });
        this._utils.error(payload);
    }

    @Action(usersActions.UserUpdate)
    userUpdate(
        { patchState, dispatch }: StateContext<UsersStateModel>,
        { payload }: usersActions.UserUpdate
    ) {
        if(!this._tokenService.isAuthenticated()) {
            //must be logged in
            asapScheduler.schedule(() =>
            dispatch(new usersActions.UserUpdateFail("Must be Authenticated"))
        )
            return;
        }

        patchState({ loaded: false, loading: true });
        let user = this._userService.preProcessUser(payload.user);

        return this._userService.update(user, true)
        .subscribe(data => { 
            asapScheduler.schedule(() =>
                dispatch(new usersActions.UserUpdateSuccess(({user: data as User})))
            )
        },
        error => {
            asapScheduler.schedule(() =>
                dispatch(new usersActions.UserUpdateFail(error.message))
            )    
        });
    }


    @Action(usersActions.UserUpdateSuccess)
    userUpdateSuccess(
        { patchState, getState }: StateContext<UsersStateModel>,
        { payload }: usersActions.UserUpdateSuccess 
    ) {

        if(!payload || !payload.user) return;
        const state = getState(); 
        let index = state.users.findIndex(x => x._id === payload.user._id);

        if(index > -1) {
            patchState({ 
                users: [...state.users.slice(0, index), 
                        payload.user, 
                        ...state.users.slice(index+1)],
                loaded: true, 
                loading: false });            
        }
    }

    @Action(usersActions.UserUpdateFail)
    userUpdateFail(
        { patchState } : StateContext<UsersStateModel>,
        { payload } : usersActions.UserUpdateFail
    ) {
        patchState({ loaded: false, loading: false });
        this._utils.error(payload);
    }
}