import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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


const  httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	authToken : any;
	user      : User;
	readonly url :  string = "http://localhost:3000/api/users";


	constructor(private http: HttpClient) { }

	create(user : User) : Observable<User> {
			console.log(user);
		return this.http.post<User>(this.url + "/register", user, httpOptions).pipe(
			tap((user: User) => log('added user with id ${user._id}')),
			catchError(this.handleError<User>('create user'))
		);
	}


	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

      // send the error to remote logging infrastructure
			console.error(error); // log to console instead

      // transform error for user consumption
			log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}
