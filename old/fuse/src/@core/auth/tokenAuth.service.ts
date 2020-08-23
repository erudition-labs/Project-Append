import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthState } from '../store/auth/auth.state';
import { Logout } from '../store/auth/auth.actions';


@Injectable({
	providedIn: 'root'
})

export class TokenAuthService {
	constructor(private _store: Store) {}

	public parseToken(token?: string) : any {
		if(!token) token = this._store.selectSnapshot(AuthState.token);

		const helper = new JwtHelperService();
		const decodedToken = helper.decodeToken(token);
		//if there is a token, return the token, if not return false
		if(!helper.isTokenExpired(token)) {
			return decodedToken;
		} else {
			//this._store.dispatch(new Logout());
			return null;
		}
	}

	public getCurrUserId() : string {
		const token = this.parseToken();
		if(!token) return null;
		return token.sub;
	}

	public isAdmin() : boolean {
		return this.parseToken().role === 'admin';
	}

	public isAuthenticated() : boolean {
		const token = this._store.selectSnapshot(AuthState.token);
		const helper = new JwtHelperService();

		if(!token || helper.isTokenExpired(token)) {
			//this._store.dispatch(new Logout());
			return false;
		} 
		return true;
	}

	public isValidToken(token: string) {
		const helper = new JwtHelperService();
		if(token) {
			return !helper.isTokenExpired(token) 
		}

		return false;
	}

}