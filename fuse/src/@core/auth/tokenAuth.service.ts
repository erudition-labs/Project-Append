import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthState } from '../store/auth/auth.state';


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
			return false;
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
		if(!token) return false;

		const helper = new JwtHelperService();
		return !helper.isTokenExpired(token);
	}

}