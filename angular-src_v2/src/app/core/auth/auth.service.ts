import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NewUser } from '../user/user.model';
import { Credentials } from '../user/credentials.model';

@Injectable({
	providedIn: 'root'
})

export class AuthService {
	constructor(private http 	: HttpClient,
				private router	: Router) {}

	public isAuthenticated(): boolean {
		const expiresAt = localStorage.getItem('ExpiresAt');

		if(!expiresAt) {
			return false;
		}

		return new Date().getTime() < parseInt(expiresAt);
	}

	public login(credentials: Credentials) : Observable<any> {
		//use spread to get individual properties off the supplied user object
		//to a new object
		return this.http.post(`http://localhost:3000/api/v1/authenticate`, { ...credentials });	
	}

	private setToken(token: string) : void {
		localStorage.setItem('token', token);
	}

	private getToken() : string {
		return localStorage.getItem('token');
	}

	private setUserInfo(userInfo: any) : void {
		localStorage.setItem('userInfo', JSON.stringify(userInfo));
	}

	private setExpiresAt(expiresAt: number) : void {
		//javascript Date() handles time differently than our tokens do 
		localStorage.setItem('expiresAt', JSON.stringify(expiresAt * 1000));
	}

	public getUserInfo() : any {
		return JSON.parse(localStorage.getItem('userInfo'));
	}

	public setUser(token: string, userInfo: string, expiresAt: number) : void {
		this.setUserInfo(userInfo);
		this.setExpiresAt(expiresAt);
	}

	public signup(user: NewUser) : Observable<any> {
		return this.http.post(`/api/users`, { ...user });	
	}

	public logout() : void {
		localStorage.removeItem('token');
		localStorage.removeItem('userInfo');
		localStorage.removeItem('expiresAt');
		this.router.navigate(['login']);
	}

	public isAdmin() : boolean {
		const userInfo = this.getUserInfo();
		if(!userInfo) {
			return false;
		}
		return userInfo.role === 'admin';
	}

	public userHasRole(expectedRole: string) : boolean {
		const userInfo = this.getUserInfo();
		return expectedRole === userInfo.role;
	}
}
