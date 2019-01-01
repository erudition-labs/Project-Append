import 'rxjs/add/observable/throw';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, retry, map, shareReplay, retryWhen, tap, delayWhen } from 'rxjs/operators';
import { Event } from './_store/events.state.model';
import { environment } from '../../../../environments/environment';
import { TokenAuthService } from '@core/auth/tokenAuth.service';
import { throwError, timer } from 'rxjs';
import { UtilsService } from '@core/utils/utils.service';


@Injectable()
export class EventService {
    readonly url : string = environment.API_URL + "/api/v1/events";

	constructor(private _http: HttpClient,
				private _tokenAuthService: TokenAuthService,
				private _utilsService: UtilsService) {}

    public getEvents() : Observable<any> {
        return this._http.get<any>(this.url + '/')
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
		return this._http.post<any>(this.url + '/', { data: event })
		.pipe(retry(3), map((response) => {
			if(response.success) {
				return response.result as Event;
			} else {
				throw new Error(response.message);
			}
		}))
	}

	public update(event: Event, preProcessed: boolean) : Observable<any> {
		if(!preProcessed) event = this.preProcessEvent(event);
		return this._http.put<any>(this.url + '/', { data: event, user: this._tokenAuthService.getCurrUserId() })
		.pipe(retry(3), map((response) => {
			if(response.success) {
				return response.result as Event;
			} else {
				return Observable.throw(response.message.json());
			}
		}))
	}
/*
	public updateEvent(event: Event) : Observable<Event> {
		let OICids 		= this.utils.getIds(event.OIC);
		let signedUpIds = this.utils.getIds(event.signedUp);

		event.OIC = OICids;
		event.pending = this.utils.getIds(event.pending);
		let singupSet = new Set();

		return this.getEvent(event._id).flatMap(result => {
			if(result) {
				let oldOICids = this.utils.getIds(result.OIC);

				for(let id of oldOICids) {
					let index = signedUpIds.indexOf(id);
					if(index > -1) {
						signedUpIds.splice(index, 1);
					}
				}
			}
			for(let id of OICids) {
				singupSet.add(id);
			}
	
			for(let id of signedUpIds) {
				singupSet.add(id);
			}
	
			event.signedUp = Array.from(singupSet);
			return this.http.put<any>(this.url + '/', { data: event, user:  this.authService.parseToken().sub })
			.pipe(retry(3), map((response) => {
				if(response.success) {
					this.success(response.message);
					return response.result as Event;
				} else {
					this.error(response.message);
					return null;
				}
			}),
				catchError(this.handleError('UpdateEvent', null)));
		});
	}*/

	public isOIC(event: Event, id?: string) : boolean {
		let userId = this._tokenAuthService.getCurrUserId();
		if(!userId) return false;

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
		let currUserId = this._tokenAuthService.getCurrUserId();
		if(!currUserId) return false;

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
		let currUserId = this._tokenAuthService.getCurrUserId();
		if(!currUserId) return false;

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
	}
	
	public preProcessEvent(event: Event) : Event {
		event.OIC = this._utilsService.getIds(event.OIC);
		event.signedUp = this._utilsService.getIds(event.signedUp);
		event.pending = this._utilsService.getIds(event.pending);
		if(event.author._id) event.author = event.author._id;

		if (event.additionalDetails && typeof event.additionalDetails === "object") {
            event.additionalDetails = JSON.stringify(event.additionalDetails);
        }

		return event;
	}

	public postProcessEvent(event: Event) : Event {
		if (event.additionalDetails && typeof event.additionalDetails !== "object") {
            event.additionalDetails = JSON.parse(event.additionalDetails);
		}	
		return event;
	}
}