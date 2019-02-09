import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './user.model';
import { environment } from '../../environments/environment';
import { UtilsService } from '../utils/utils.service';
import { map } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})

export class UserService {
	readonly url : string = environment.API_URL + "/api/v1/users"

	constructor(private _http		: HttpClient,
				private _utils		: UtilsService) {}

	public checkEmail(email: string) : Observable<any> {
		const params = new HttpParams({
			fromObject: {
				email
			}
		});
		return this._http.get(this.url + `/check-email`, { params });
	}

	public getUsers() : Observable<User[]> {
		return this._http.get<any>(this.url + '/users')
		.pipe(map((response) => {
			if(response.success) {
				return Object.values(response.result) as User[];
			} else {
				return [];
			}
		  }));
	}



	public getUser(id : string) : Observable<User> {
		return this._http.get<any>(this.url + '/' + id)
		.pipe(map((response) => {
			if(response.success) {
				return response.result as User;
			} else {
				return null;
			}
		  }));
	}

	public update(user: User, preProcessed: boolean) : Observable<any> {
		if(!preProcessed) user = this.preProcessUser(user);
		return this._http.put<any>(this.url + '/' + user._id, {userData: user})
		.pipe(map((response) => {
			if(response.success) {
				return response.result as User;
			} else {
				return null;
			}
		}))
	}

	public preProcessUser(user: User) : User {
		user.events = this._utils.getIds(user.events);
		return user;
	}
}
