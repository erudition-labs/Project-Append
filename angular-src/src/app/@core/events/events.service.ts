import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Event } from './event.model';
import { User } from '../user/user.model';
import { AuthService } from '../auth/auth.service';
import { UtilsService } from '../utils/utils.service';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/mergeMap';


@Injectable({
	providedIn: 'root'
})

export class EventsService {
	constructor(private http		: HttpClient,
				private authService	: AuthService,
				private utils		: UtilsService) {}

	readonly url : string = environment.API_URL + "/api/v1/events"

	public getEvents() : Observable<any> {
		return this.http.get(this.url + '/');	
	}

	public getEvent(id: string) : Observable<any> {
		return this.http.get(this.url + '/' + id);
	}

	public createEvent(event: Event) : Observable<any> {
		return this.http.post(this.url + '/', { data: event });	
	}

	public updateEvent(event: Event) : Observable<any> {
		let OICids 		= this.utils.getIds(event.OIC);
		let signedUpIds = this.utils.getIds(event.signedUp);

		event.OIC = OICids;
		event.pending = this.utils.getIds(event.pending);
		let singupSet = new Set();

		return this.getEvent(event._id).flatMap(httpResult => {
			if(httpResult.success) {
				let oldOICids = this.utils.getIds(httpResult.result.OIC);

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
			return this.http.put(this.url + '/', { data: event, user:  this.authService.parseToken().sub });
		});
	}

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
	}

	public willSpotsBeLeft(event: Event) : boolean {
		let spots = event.spots;
		if(spots === -1) return true;
		spots++;

		return spots <= event.spots;
	}

	public signupUser(event: Event) : Observable<any> {
		event.additionalDetails = JSON.stringify(event.additionalDetails);
		let submitter = this.authService.parseToken().sub;

		//to ensure the ids are unique 
		let idsSet = new Set(this.utils.getIds(event.signedUp));
		idsSet.add(submitter);
		event.signedUp = Array.from(idsSet);

		return this.http.put(this.url + '/', { data: event, user: submitter, signup: true });
	}

	public userPending(event : Event) : Observable<any> {
		event.additionalDetails = JSON.stringify(event.additionalDetails);
		let submitter = this.authService.parseToken().sub;
		let idsSet = new Set(this.utils.getIds(event.pending));

		idsSet.add(submitter);
		event.pending = Array.from(idsSet);
		return this.http.put(this.url + '/', { data: event, user: submitter, signup: true });
	}

	public unregisterUser(event: Event) : Observable<any> {
		event.additionalDetails = JSON.stringify(event.additionalDetails);
		let submitter = this.authService.parseToken().sub;
		
		//handled accepted signed up users
		let ids = this.utils.getIds(event.signedUp);
		let index = ids.indexOf(submitter);
		if(index >  -1) {
			ids.splice(index, 1); //if found remove it
		}
		event.signedUp = ids; //deep copy of ids

		//handle pending signed up users
		let pendingIds = this.utils.getIds(event.pending);
		index = pendingIds.indexOf(submitter);
		if(index >  -1) {
			pendingIds.splice(index, 1); //if found remove it
		}
		event.pending = pendingIds;

		if(this.isSpotsLeft(event)) event.isClosed = false;

		return this.http.put(this.url + '/', { data: event, user: this.authService.parseToken().sub, signup: true });
	}

	public acceptPending(event: Event) : Observable<any> {
		let submitter = this.authService.parseToken().sub;
		let pendingIds = this.utils.getIds(event.pending);

		let idsSet = new Set(this.utils.getIds(event.signedUp));
		let index = pendingIds.indexOf(submitter); //look for id in pending
		
		if(index !==  -1) {
			pendingIds.splice(index, 1); //if found remove it
			//add to approved signed up array
			idsSet.add(submitter);
		}

		event.signedUp = Array.from(idsSet);
		event.pending = pendingIds;

		return this.http.put(this.url + '/', { data: event, user:  this.authService.parseToken().sub });	
	}

}
