import { Action, Selector, State, StateContext } from '@ngxs/store';
import { asapScheduler } from 'rxjs';
import { AuthStateModel } from './auth.state.model';
import * as actions  from './auth.actions';
import { AuthService } from '@core/auth/auth.service';
import { Credentials } from '@core/user/credentials.model';
import { Store } from '@ngxs/store';
import { LoadUsers } from '../users/users.actions';
import { UtilsService } from '@core/utils/utils.service';
import { TokenAuthService } from '../../auth/tokenAuth.service';


@State<AuthStateModel>({
    name: 'auth',
    defaults : {
        loading : false,
        loaded: false,
        token: null
    }
  })
  export class AuthState {
    constructor(private _authService: AuthService,
                private _utils: UtilsService,
                private _store: Store) {}

    @Selector()
    static token(state: AuthStateModel) { return state.token; }
    
    @Action(actions.Login)
    login(
        { patchState, dispatch }: StateContext<AuthStateModel>, 
        { payload }: actions.Login
    ) {
      patchState({ loading: true});
      return this._authService.login(payload as Credentials)
        .subscribe(token => {
            asapScheduler.schedule(() =>
                dispatch(new actions.LoginSuccess(token)))
        }, 
        error => {
            asapScheduler.schedule(() => 
                dispatch(new actions.LoginFail(error.message))
            )
        });
    }

    @Action(actions.LoginSuccess)
    loginSuccess(
        { patchState, dispatch }  : StateContext<AuthStateModel>,
        { payload } : actions.LoginSuccess
    ) { 
        patchState({
            loaded : true,
            loading: false,
            token: payload
        });
        this._utils.success("Login Success, Welcome!");
        dispatch(new LoadUsers());
    }

    @Action(actions.LoginFail)
    loginFail(
        { patchState } : StateContext<AuthStateModel>,
        { payload }    : actions.LoginFail
    ) {
        patchState({ loaded: false, loading: false, token: null });
    }
  
    @Action(actions.Logout)
    logout({ setState }: StateContext<AuthStateModel>) {
        setState({
            loaded : false,
            loading: false,
            token: null
        });
    }
  
  }