import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})

export class UserService {
	constructor(private http: HttpClient) {}

	readonly url : string = "http://localhost:3000/api/v1/"
	public checkEmail(email: string) : Observable<any> {
		const params = new HttpParams({
			fromObject: {
				email
			}
		});	
		return this.http.get(`users/check-email`, { params });
	}
}
