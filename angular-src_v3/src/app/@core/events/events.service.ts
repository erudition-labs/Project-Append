import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Event } from './event.model';

@Injectable({
	providedIn: 'root'
})

export class EventsService {
	constructor(private http: HttpClient) {}

	readonly url : string = "http://localhost:3000/api/v1/events"

	public getEvents() : Observable<any> {
		return this.http.get(this.url + '/');	
	}

	public createEvent(event: Event) : Observable<any> {
		return this.http.post(this.url + '/', { data: event });	
	}

	public updateEvent(event: Event) : Observable<any> {
		return this.http.put(this.url + '/', { data: event });	
	}
}
