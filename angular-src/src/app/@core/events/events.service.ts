import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Event } from './event.model';
import { User } from '../user/user.model';
import { AuthService } from '../auth/auth.service';
import { UtilsService } from '../utils/utils.service';
import { environment } from '../../../environments/environment';
import { catchError, retry, map } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './../utils/http-error-handler.service';
import 'rxjs/add/operator/mergeMap';
import { ToastrService } from 'ngx-toastr';



@Injectable({
	providedIn: 'root'
})

export class EventsService {
	private handleError: HandleError;
	readonly url : string = environment.API_URL + "/api/v1/events"


	constructor(private http				: HttpClient,
				private authService			: AuthService,
				private utils				: UtilsService,
				private httpErrorHandler	: HttpErrorHandler,
				private toast				: ToastrService) 
	{
		this.handleError = httpErrorHandler.createHandleError('EventsService');
	}

	public getEvents() : Observable<Event[]> {
		return this.http.get<any>(this.url + '/')
		.pipe(retry(3), map((response) => {
			if(response.success) {
				return Object.values(response.result) as Event[];
			} else {
				this.error(response.message);
				return null;
			}
		  }),
		catchError(this.handleError('getEvents', [])));	
	}

	public getEvent(id: string) : Observable<Event> {
		return this.http.get<any>(this.url + '/' + id)
		.pipe(retry(3), map((response) => {
			if(response.success) {
				return response.result as Event;
			} else {
				return null;
			}
		}),
		catchError(this.handleError('getEvent', null)));
	}

	public createEvent(event: Event) : Observable<Event> {
		return this.http.post<any>(this.url + '/', { data: event })
		.pipe(retry(3), map((response) => {
			if(response.success) {
				this.success(response.message);
				return response.result as Event;
			} else {
				this.error(response.message);
				return null;
			}
		}),
		catchError(this.handleError('CreateEvent', null)));	
	}

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

	public userPending(event : Event) : Observable<Event> {
		event.additionalDetails = JSON.stringify(event.additionalDetails);
		let submitter = this.authService.parseToken().sub;
		let idsSet = new Set(this.utils.getIds(event.pending));

		idsSet.add(submitter);
		event.pending = Array.from(idsSet);

		if(this.isSpotsLeft(event)) {
			event.isClosed = false;
		} else {
			event.isClosed = true;
		}

		return this.http.put<any>(this.url + '/', { data: event, user: submitter, signup: true })
		.pipe(retry(3), 
		map((response) => {
			if(response.success) {
				this.success("User pending acceptance");
				return response.result as Event;
			} else {
				this.error("");
				return null;
			}		
		}),
		catchError(this.handleError('userPending', null)));
	}

	public unregisterUser(event: Event) : Observable<Event> {
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

		if(this.isSpotsLeft(event)) {
			event.isClosed = false;
		} else {
			event.isClosed = true;
		}

		return this.http.put<any>(this.url + '/', { data: event, user: this.authService.parseToken().sub, signup: true })
		.pipe(retry(3), map((response) => {
			if(response.success) {
				return response.result as Event;
			} else {
				this.error("Failed to unregister");
				return null;
			}		
		}),
		catchError(this.handleError('unregisterUser', null)));
	}




	public acceptPending(event: Event, id: string) : Observable<Event> {
		event.additionalDetails = JSON.stringify(event.additionalDetails);
		//let submitter = this.authService.parseToken().sub;
		let pendingIds = this.utils.getIds(event.pending);

		let idsSet = new Set(this.utils.getIds(event.signedUp));
		let index = pendingIds.indexOf(id); //look for id in pending
		
		if(index > -1) {
			pendingIds.splice(index, 1); //if found remove it
			//add to approved signed up array
			idsSet.add(id);
		}

		event.signedUp = Array.from(idsSet);
		event.pending = pendingIds;

		if(this.isSpotsLeft(event)) {
			event.isClosed = false;
		} else {
			event.isClosed = true;
		}

		return this.http.put<any>(this.url + '/', { data: event, user: this.authService.parseToken().sub, signup: true })
		.pipe(retry(3),  map((response) => {
			if(response.success) {
				return response.result as Event;
			} else {
				this.error("Something went wrong");
				return null;
			}		
		}),
		catchError(this.handleError('acceptPending', null)));	
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
