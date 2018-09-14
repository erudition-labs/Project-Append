import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Update } from './update.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
	providedIn: 'root'
})

export class UpdatesService {
	constructor(private http		: HttpClient,
				private authService	: AuthService) {}

	readonly url : string = "http://cadet.ca782.org:3000/api/v1/updates"

	public getUpdates() : Observable<any> {
		return this.http.get(this.url + '/');	
	}

	public createUpdate(update: Update) : Observable<any> {
		console.log(update);
		
		return this.http.post(this.url + '/', { data: update });	
	}

	// public createEvent(event: Event) : Observable<any> {
	// 	return this.http.post(this.url + '/', { data: event });	
	// }

	// public updateEvent(event: Event) : Observable<any> {
	// 	return this.http.put(this.url + '/', { data: event, user:  this.authService.parseToken().sub });	
	// }
}
