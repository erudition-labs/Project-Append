import { Action, Selector, State, StateContext, NgxsOnInit } from '@ngxs/store';
import { asapScheduler, of } from 'rxjs';
import { User } from '@core/user/user.model';
import { UsersStateModel } from './users.state.model';
import * as usersActions from './users.actions';
import { UserService } from '@core/user/user.service';
import { catchError } from 'rxjs/operators';
import { dispatch } from 'rxjs/internal/observable/pairs';

@State<UsersStateModel>({
    name: 'users',
    defaults: {
        users: [],
        loaded: false,
        loading: false,
    }
  })

export class UsersState implements NgxsOnInit {
    constructor(private _userService: UserService) {}
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
            user.events.push(payload.eventId);

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
        console.log(index);

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
        console.log(payload);
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

            //Remove event
            let eventIndex = user.events.findIndex(x => x._id === payload.eventId);
            console.log(user);
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
                asapScheduler.schedule(() => 
                    dispatch(new usersActions.UserEventRemoveFail("No Event Found"))
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
        console.log(payload);
    }
}