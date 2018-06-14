import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { log } from 'util';

export interface User {
	_id				?: string;
	firstName		:  string;
	lastName		:  string;
	email			:  string;
	rank			:  string;
	flight			:  string;
	team			:  string;
	password		:  string;
}



@Injectable({
	providedIn: 'root'
})
export class AuthService {
	authToken : string;
	user      : User;
	readonly url :  string = "http://localhost:3000/api/users";

	readonly httpOptions = {
		headers: new HttpHeaders({
			'Content-Type':  'application/json',
			'Authorization': this.authToken
	})
};
	constructor(private http : HttpClient) { }

	create(user : User) : Observable<User> {  //might have to change this since im not actually returning a user object from my post...but still works
		return this.http.post<User>(this.url + "/register", user, this.httpOptions).pipe(
			tap((user: User) => console.log('added user with id: ' + user._id)),
			catchError(this.handleError<User>('create user'))
			);
	}

	authenticate(user: User) : Observable<User> {
		return this.http.post<User>(this.url + "/authenticate", user, this.httpOptions).pipe(
			tap((user: User) => console.log('authenticated user')),
			catchError(this.handleError<User>('authenticate user'))
		);
	}

	getProfile() : Observable<any> {
		this.loadToken();
		return this.http.get<any>(this.url + "/profile",  this.httpOptions).pipe(
			tap((data : any) => console.log('profile')),
			catchError(this.handleError<any>('fetch profile'))
		);
	}

	storeUserData(token, user) : void {
		localStorage.setItem('id_token', token);
		localStorage.setItem('user', JSON.stringify(user));
		this.authToken	= token;
		this.user		= user;

	}

	loadToken() : void {
		this.authToken = localStorage.getItem('id_token');
	}

	loggedIn() : boolean {
		let jwtHelper = new JwtHelperService();
		return jwtHelper.isTokenExpired('id_token');
	}

	logout() : void {
		this.authToken = null;
		this.user = null;
		localStorage.clear();
	}


	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

      // send the error to remote logging infrastructure
			console.error(error); // log to console instead

      // transform error for user consumption
			console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}
