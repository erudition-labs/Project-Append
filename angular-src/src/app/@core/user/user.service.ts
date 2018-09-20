import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './user.model';
import { Event } from './../events/event.model';
import { environment } from '../../../environments/environment';
import { UtilsService } from '../utils/utils.service';
import { AuthService } from '../auth/auth.service';
import 'rxjs/add/operator/mergeMap';



@Injectable({
	providedIn: 'root'
})

export class UserService {
	constructor(private http		: HttpClient,
				private utils		: UtilsService,
				private authService	: AuthService) {}

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

	public getUser(id : string) : Observable<any> {
		return this.http.get(this.url + '/' + id);
	}

	public updateUser(id : string, user: User) : Observable<any> {
		//convert Users Objects back to user ids
		let idSet = new Set(this.utils.getIds(user.events));
		user.events = Array.from(idSet);
		
		return this.http.put(this.url + '/' + id, { userData: user });	
	}

	public eventSignup(event: Event, id: string) : Observable<any> {
		return this.getUser(id).flatMap(httpResult => {
			if(httpResult.success) {
				let user = httpResult.result;
				let events = user.events;
				if(events) {
					let oldEventIdsSet = new Set(this.utils.getIds(events));
					oldEventIdsSet.add(event._id);
					user.events = Array.from(oldEventIdsSet);
				}				
				return this.http.put(this.url + '/' + id, { userData: user });
			}
		});
	}

	public eventUnregister(event: Event, id?: string) : Observable<any> {
		//let idSet = new Set(this.utils.getIds(user.events));
		if(!id) id = this.authService.parseToken().sub;
		
		return this.getUser(id).flatMap(httpRsult => {
			if(httpRsult.success) {
				let user = httpRsult.result;
				let events = user.events;
				if(events) {
					let ids = this.utils.getIds(events);
					let index = ids.indexOf(event._id);
					if(index > -1) {
						ids.splice(index, 1);
					}
					user.events = ids;
				}
				return this.http.put(this.url + '/' + id, { userData: user });
			}
		});
		
	}

	public deleteUser(id : string) : Observable<any> {
		return this.http.delete(this.url + '/' + id);
	}
	public markChangesViewed() : void {
		this.getUser(this.authService.parseToken().sub).subscribe(httpResult => {
			if(httpResult.success) {
				let user = httpResult.result;
				user.isChangelogViewed = true;
				this.updateUser(user._id, user).subscribe(result => {
					if(result.success) {
					}
				});
			}
		});		
	}
}
