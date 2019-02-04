import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../store/auth/auth.state';
import { TokenAuthService } from './tokenAuth.service'

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private _store: Store, 
                public _router: Router,
                private _tokenAuthService: TokenAuthService) {}

    canActivate(): boolean {
        if(!this._tokenAuthService.isAuthenticated()) {
            this._router.navigate(['login']);
            return false;
        }
        return true;
    }
}
