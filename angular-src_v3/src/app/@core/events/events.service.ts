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
		return (event.OIC.includes(this.authService.parseToken().sub));
	}
}
