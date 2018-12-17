import { Action, Selector, State, StateContext } from '@ngxs/store';
import { asapScheduler } from 'rxjs';
import { AuthStateModel } from './auth.state.model';
import * as actions  from './auth.actions';
import { AuthService } from '@core/auth/auth.service';
import { Credentials } from '@core/user/credentials.model';
import { Router } from '@angular/router';


@State<AuthStateModel>({
    name: 'auth',
    defaults : {
        loading : false,
        loaded: false,
        token: null,
    }
  })
  export class AuthState {
  
    @Selector()
    static token(state: AuthStateModel) { return state.token; }
  
    constructor(private _authService: AuthService, private _router: Router) {}
  
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
        { patchState }  : StateContext<AuthStateModel>,
        { payload }     : actions.LoginSuccess
    ) { 
        patchState({
            loaded : true,
            loading: false,
            token: payload
        });
    }

    @Action(actions.LoginFail)
    loginFail(
        { patchState } : StateContext<AuthStateModel>,
        { payload }    : actions.LoginFail
    ) {
        patchState({ loaded: false, loading: false, token: null });
        console.log(payload);
    }
  /*
    @Action(actions.Logout)
    logout({ setState, getState }: StateContext<AuthStateModel>) {
      const { token } = getState();
      return this._authService.logout().pipe(tap(() => {
        setState({});
      });
    }*/
  
  }