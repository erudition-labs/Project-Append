import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})

export class EventsService {
	constructor(private http: HttpClient) {}

	readonly url : string = "http://localhost:3000/api/v1/events"

	public getEvents() : Observable<any> {
		return this.http.get(this.url + '/');	
	}
}
