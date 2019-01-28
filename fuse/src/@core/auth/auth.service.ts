import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NewUser } from '../user/user.model';
import { Credentials } from '../user/credentials.model';
import { environment } from '../../environments/environment';
import { retry, map } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})

export class AuthService {
	constructor(private http 	: HttpClient,
				private router	: Router) {}

	readonly url : string = environment.API_URL + "/api/v1";

	public login(credentials: Credentials) : Observable<string> {
		//use spread to get individual properties off the supplied user object
		//to a new object
		return this.http.post<any>(this.url + `/authenticate`, { ...credentials })
			.pipe(retry(3), map((response) => {
				if(response.success) {
					return response.token as string;
				} else {
					throw new Error(response.message)
				}
			}))
	}

	public signup(user: NewUser) : Observable<any> {
		return this.http.post(this.url + `/users`, { ...user });
	}

	public verify(token: string) : any {
		 const params = new HttpParams({
		 	fromObject: { token }
		 });
		return this.http.post(this.url + '/users/email-verification/' + token, { params });
	}

}