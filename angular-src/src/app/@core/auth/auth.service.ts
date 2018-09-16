import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NewUser } from '../user/user.model';
import { Credentials } from '../user/credentials.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})

export class AuthService {
	constructor(private http 	: HttpClient,
				private router	: Router) {}

	readonly url : string = environment.API_URL + "/api/v1";

	public isAuthenticated(): boolean {
		//const helper = new JwtHelperService();
		//return helper.isTokenExpired(this.getToken());
		const expiresAt = localStorage.getItem('expiresAt');
		if(!expiresAt) {
			return false;
		}
		return new Date().getTime() < parseInt(expiresAt);
	}

	public login(credentials: Credentials) : Observable<any> {
		//use spread to get individual properties off the supplied user object
		//to a new object
		return this.http.post(this.url + `/authenticate`, { ...credentials });
	}

	private setToken(token: string) : void {
		localStorage.setItem('token', token);
	}

	public getToken() : string {
		return localStorage.getItem('token');
	}

	public parseToken() : any {
		const helper = new JwtHelperService();
		const decodedToken = helper.decodeToken(this.getToken());
		//if there is a token, return the token, if not return false
		if(!helper.isTokenExpired(this.getToken())) {
			return decodedToken;
		} else {
			return false;
		}
	}

	private setUserInfo(userInfo: any) : void {
		localStorage.setItem('userInfo', JSON.stringify(userInfo));
	}

	private setExpiresAt(expiresAt: number) : void {
		//javascript Date() handles time differently than our tokens do
		localStorage.setItem('expiresAt', JSON.stringify(expiresAt * 1000));
	}

	public getUserInfo() : any {
		//either a token or false
		return this.parseToken();
	}

	public setUser(token: string, userInfo: string, expiresAt: number) : void {
		this.setToken(token);
		this.setUserInfo(userInfo);
		this.setExpiresAt(expiresAt);
	}

	public signup(user: NewUser) : Observable<any> {
		return this.http.post(this.url + `/users`, { ...user });
	}

	public logout() : void {
		localStorage.removeItem('token');
		localStorage.removeItem('userInfo');
		localStorage.removeItem('expiresAt');
		this.router.navigate(['login']);
	}

	public isAdmin() : boolean {
		//either false from there being no token, or true or false from comparing the token
		const userInfo = this.getUserInfo();
		return userInfo.role === 'admin';
	}

	public verify(token: string) : any {
		 const params = new HttpParams({
		 	fromObject: { token }
		 });
		return this.http.post(this.url + '/users/email-verification/' + token, { params });
	}

	public userHasRole(expectedRole: string) : boolean {
		const userInfo = this.getUserInfo();
		return expectedRole === userInfo.role;
	}
}
