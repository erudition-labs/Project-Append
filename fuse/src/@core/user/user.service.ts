import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './user.model';
import { Event } from './../events/event.model';
import { environment } from '../../environments/environment';
import { UtilsService } from '../utils/utils.service';
import { AuthService } from '../auth/auth.service';
import { catchError, retry, map } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './../utils/http-error-handler.service';
import 'rxjs/add/operator/mergeMap';
import { ToastrService } from 'ngx-toastr';


@Injectable({
	providedIn: 'root'
})

export class UserService {
	private handleError: HandleError;
	readonly url : string = environment.API_URL + "/api/v1/users"

	constructor(private _http		: HttpClient,
				private _utils		: UtilsService)
				//private authService	: AuthService,
				//private httpErrorHandler	: HttpErrorHandler,
				//private toast				: ToastrService) 
	{
		//this.handleError = httpErrorHandler.createHandleError('UserService');
	}

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
				//this.error(response.message);
				return [];
			}
		  })//,
		/*catchError(this.handleError('getUsers', []))*/);
	}



	public getUser(id : string) : Observable<User> {
		return this._http.get<any>(this.url + '/' + id)
		.pipe(map((response) => {
			if(response.success) {
				return response.result as User;
			} else {
				//this.error(response.message);
				return null;
			}
		  }),
		/*catchError(this.handleError('getUser', null))*/);
	}

	public update(user: User, preProcessed: boolean) : Observable<any> {
		if(!preProcessed) user = this.preProcessUser(user);
		return this._http.put<any>(this.url + '/' + user._id, {userData: user})
		.pipe(map((response) => {
			if(response.success) {
				return response.result as User;
			} else {
				return null;//Observable.throw(response.message.json());
			}
		}))
	}

	public preProcessUser(user: User) : User {
		user.events = this._utils.getIds(user.events);
		return user;
	}
}
