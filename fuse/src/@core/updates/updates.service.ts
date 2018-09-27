import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Update } from './update.model';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';


@Injectable({
	providedIn: 'root'
})

export class UpdatesService {
	constructor(private http		: HttpClient,
				private authService	: AuthService) {}

	readonly url : string = environment.API_URL + "/api/v1/updates"

	public getUpdates() : Observable<any> {
		return this.http.get(this.url + '/');	
	}

	public createUpdate(update: Update) : Observable<any> {
		return this.http.post(this.url + '/', { data: update });	
	}

	public editUpdate(update : Update) : Observable<any> {
		return this.http.put(this.url + '/', { data: update });	
	}

	public deleteUpdate(id : string) : Observable<any> {
		return this.http.delete(this.url + '/' + id);
	}
}
