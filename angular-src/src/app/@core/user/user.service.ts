import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './user.model';
import { Event } from './../events/event.model';
import { environment } from '../../../environments/environment';
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

	constructor(private http		: HttpClient,
				private utils		: UtilsService,
				private authService	: AuthService,
				private httpErrorHandler	: HttpErrorHandler,
				private toast				: ToastrService) 
	{
		this.handleError = httpErrorHandler.createHandleError('UserService');
	}

	public checkEmail(email: string) : Observable<any> {
		const params = new HttpParams({
			fromObject: {
				email
			}
		});
		return this.http.get(this.url + `/check-email`, { params });
	}

	public getUsers() : Observable<User[]> {
		return this.http.get<any>(this.url + '/users')
		.pipe(retry(3), map((response) => {
			if(response.success) {
				return Object.values(response.result) as User[];
			} else {
				this.error(response.message);
				return null;
			}
		  }),
		catchError(this.handleError('getUsers', [])));
	}



	public getUser(id : string) : Observable<User> {
		return this.http.get<any>(this.url + '/' + id)
		.pipe(retry(3), map((response) => {
			if(response.success) {
				return response.result as User;
			} else {
				this.error(response.message);
				return null;
			}
		  }),
		catchError(this.handleError('getUser', null)));
	}

	public updateUser(id : string, user: User) : Observable<User> {
		//convert Users Objects back to user ids
		let idSet = new Set(this.utils.getIds(user.events));
		user.events = Array.from(idSet);
		
		return this.http.put<any>(this.url + '/' + id, { userData: user })
		.pipe(retry(3), map((response) => {
			if(response.success) {
				this.success(response.message);
				return response.result as User;
			} else {
				this.error(response.message);
				return null;
			}
		  }),
		catchError(this.handleError('updateUser', null)));	
	}

	public eventSignup(event: Event, id: string) : Observable<User> {
		return this.getUser(id).flatMap(result => {
			if(result) {
				let user = result;
				let events = user.events;
				if(events) {
					let oldEventIdsSet = new Set(this.utils.getIds(events));
					oldEventIdsSet.add(event._id);
					user.events = Array.from(oldEventIdsSet);
				}				
				return this.http.put<any>(this.url + '/' + id, { userData: user })
				.pipe(retry(3), map((response) => {
					if(response.success) {
						return response.result as User;
					} else {
						//this.error(response.message);
						return null;
					}
				  }),
				catchError(this.handleError('eventSignup', null)));
			}
		});
	}

	public eventUnregister(event: Event, id?: string) : Observable<User> {
		//let idSet = new Set(this.utils.getIds(user.events));
		if(!id) id = this.authService.parseToken().sub;
		
		return this.getUser(id).flatMap(result => {
			if(result) {
				let user = result;
				let events = user.events;
				if(events) {
					let ids = this.utils.getIds(events);
					let index = ids.indexOf(event._id);
					if(index > -1) {
						ids.splice(index, 1);
					}
					user.events = ids;
				}
				return this.http.put<any>(this.url + '/' + id, { userData: user })
				.pipe(retry(3), map((response) => {
					if(response.success) {
						return response.result as User;
					} else {
						//this.error(response.message);
						return null;
					}
				  }),
				catchError(this.handleError('eventUnregister', null)));
			}
		});
		
	}

	public deleteUser(id : string) : void {
		this.http.delete<any>(this.url + '/' + id)
		.pipe(retry(3), map((response) => {
			if(response.success) {
				this.success(response.message);
			} else {
				this.error(response.message);
			}
		  }),
		catchError(this.handleError('eventUnregister', null)));
	}

	public markChangesViewed() : void {
		this.getUser(this.authService.parseToken().sub).subscribe(result => {
			if(result) {
				let user = result;
				user.isChangelogViewed = true;

				this.http.put<any>(this.url + '/' + user._id, { userData: user })
				.pipe(retry(3),
		 	 
				catchError(this.handleError('markChangesViewed', null)));
			}
		});		
	}

	private error(msg : string) : void {
		this.toast.error(msg, 'Error!', {
			timeOut: 5000,
			closeButton: true,
			progressBar: true,
			progressAnimation: 'decreasing',
			positionClass: 'toast-top-right',
		  });
	}

	private success(msg: string) : void {
		this.toast.success(msg, 'Success!', {
			timeOut: 5000,
			closeButton: true,
			progressBar: true,
			progressAnimation: 'decreasing',
			positionClass: 'toast-top-right',
		  });
	}
}
