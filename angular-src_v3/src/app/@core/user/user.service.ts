import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
	providedIn: 'root'
})

export class UserService {
	constructor(private http: HttpClient) {}

	readonly url : string = "http://localhost:3000/api/v1/users"
	public checkEmail(email: string) : Observable<any> {
		const params = new HttpParams({
			fromObject: {
				email
			}
		});	
		return this.http.get(this.url + `/check-email`, { params });
	}

	public getUsers() : Observable<User[]> {
		return this.http.get<User[]>(this.url + '/users');
	}
}
