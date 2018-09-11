import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Event } from './event.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
	providedIn: 'root'
})

export class EventsService {
	constructor(private http		: HttpClient,
				private authService	: AuthService) {}

	readonly url : string = "http://localhost:3000/api/v1/events"

	public getEvents() : Observable<any> {
		return this.http.get(this.url + '/');	
	}

	public createEvent(event: Event) : Observable<any> {
		return this.http.post(this.url + '/', { data: event });	
	}

	public updateEvent(event: Event) : Observable<any> {
		return this.http.put(this.url + '/', { data: event, user:  this.authService.parseToken().sub });	
	}

	public isOIC(event: Event) : boolean {
		for(let user of event.OIC) {
			//console.log(user);
			if(user._id === this.authService.parseToken().sub) {
				return true;
			}
		}
		return false;
	}

	public isSignedUp(event: Event) : boolean {
		for(let user of event.signedUp){
			if(user._id === this.authService.parseToken().sub) {
				return true;
			}
		}
		return false;
	}

	public signupUser(event: Event) : Observable<any> {
		event.signedUp.push()
		//event.additionalDetails = JSON.stringify(event.additionalDetails);
		return this.http.put(this.url + '/signup', { data: event, user: this.authService.parseToken().sub });
	}
}
