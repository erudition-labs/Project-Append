import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../store/auth/auth.state';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private _store: Store, public router: Router) {}

    canActivate(): boolean {
        const token = this._store.selectSnapshot(AuthState);
        return token !== undefined;
    }
}
