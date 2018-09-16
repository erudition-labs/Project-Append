import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './user.model';
import { environment } from '../../../environments/environment';


@Injectable({
	providedIn: 'root'
})

export class UserService {
	constructor(private http: HttpClient) {}

	readonly url : string = environment.API_URL + "/api/v1/users"
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

	public getUser(id : string) : Observable<User> {
		return this.http.get<User>(this.url + '/' + id);
	}

	public updateUser(id : string, user: User) : Observable<any> {
		return this.http.put(this.url + '/' + id, { userData: user });	
	}

	public deleteUser(id : string) : Observable<any> {
		return this.http.delete(this.url + '/' + id);
	}
}
