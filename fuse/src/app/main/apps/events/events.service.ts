import 'rxjs/add/observable/throw';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, retry, map, shareReplay, retryWhen, tap, delayWhen } from 'rxjs/operators';
import { Event } from './_store/events.state.model';
import { environment } from '../../../../environments/environment';
import { AuthService } from '@core/auth/auth.service';
import { throwError, timer } from 'rxjs';


@Injectable()
export class EventService {
    readonly url : string = environment.API_URL + "/api/v1/events";

	constructor(private http		: HttpClient,
				private authService : AuthService) {}

    public getEvents() : Observable<any> {
        return this.http.get<any>(this.url + '/')
		.pipe(retry(3), map((response) => {
			if(response.success) {
				return Object.values(response.result) as Event[];
			} else {
				return Observable.throw(response.message.json());
				//this.error(response.message);
				//return null;
			}
		  }),
		catchError((error: any) => {return Observable.throw(error.json())}));	
	}

	public create(event: Event) : Observable<any> {
		return this.http.post<any>(this.url + '/', { data: event })
		.pipe(retry(3), map((response) => {
			if(response.success) {
				return response.result as Event;
			} else {
				throw new Error(response.message);
			}
		}))
	}

/*
	public isOIC(event: Event, id?: string) : boolean {
		let userId = this.authService.parseToken().sub
		if(id) userId = id;
		
		if(!event.OIC) return false;

		for(let user of event.OIC) {
			if(user._id === userId) {
				return true;
			}
		}
		return false;
	}

	public isSignedUp(event: Event, id?: string) : boolean {
		let currUserId = this.authService.parseToken().sub;

		if(!id) {
			for(let user of event.signedUp) {
				if(user && currUserId && (user._id === currUserId)) {
					return true;
				}
			}
			return false;
		} else {

			for(let user of event.signedUp) {
				if(user && (user._id === id)) {
					return true;
				}
			}
			return false;
		}
	}

	public isPending(event: Event, id?: string) : boolean {
		let currUserId = this.authService.parseToken().sub;

		if(!id) {
			for(let user of event.pending) {
				if(user && currUserId && (user._id === currUserId)) {
					return true;
				}
			}
			return false;
		} else {

			for(let user of event.pending) {
				if(user && (user._id === id)) {
					return true;
				}
			}
			return false;
		}
	}

	public isSpotsLeft(event: Event) : boolean {
		let totalSpots = event.spots;
		if(totalSpots === -1) return true;
		let signedUp = event.signedUp.length;

		return totalSpots > signedUp;
	}*/
    
}