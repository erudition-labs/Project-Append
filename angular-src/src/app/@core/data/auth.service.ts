/*
 * Note that Login and password reseting is handled by Nebular by defualt, We
 * couldn't use their service for register because we needed different
 * behavior. One option might be to extend their service and override the
 * public register function. 
 * 

import { Inject, Injectable 			} from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { switchMap, map 				} from 'rxjs/operators';
import { NbAuthResult, NbAuthService,NbAuthJWTToken 	} from '@nebular/auth';
import { HttpClient, HttpHeaders 	} from '@angular/common/http';

export class EmailPassAuthProvider extends NbEmailPassAuthProvider {

	register(strategyName: string, data?: any): Observable<NbAuthResult> {
		return this.getStrategy(strategyName).register(data)
			.pipe(
				switchMap((result: NbAuthResult) => {
					return this.processResultToken(result);
				}),
			);
	}
}

* However, for now, I will just write my own and import it. This service will
* be for Register and email verification related tasks.
*/





import { Injectable 				} from '@angular/core';
import { HttpClient, HttpHeaders 	} from '@angular/common/http';
import { Observable, of 			} from 'rxjs';
import { catchError, map, tap 		} from 'rxjs/operators';
import { log 						} from 'util';
import { NbAuthResult, NbAuthService,NbAuthJWTToken 	} from '@nebular/auth';

export interface User {
	_id				?: string; //perhaps move this to a models folder?
	firstName		:  string;
	lastName		:  string;
	email			:  string;
	rank			:  string;
	flight			:  string;
	team			:  string;
	password		:  string;
}

const  httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	authToken : any;
	user      : User;
	readonly url :  string = "http://localhost:3000/api/v1/auth";


	constructor(private http: HttpClient,
				private authService : NbAuthService) { }

	create(user : User)  {  
		return this.http.post(this.url + "/register", user, httpOptions)
			.pipe(tap((user) => console.log('added user')),
			catchError(this.handleError<any>('create user'))
			);
	}

	verify(code : string) {
		return this.http.post(this.url + "/email-verification/" + code, httpOptions)
			.pipe(tap((code:string) => console.log('verified')),
			catchError(this.handleError<any>('error' + code))
			);
	}

	private loadToken() : any {
		return new Promise(resolve => 
			this.authService.getToken().subscribe((token : NbAuthJWTToken) => {
				if(token.isValid()) {
					//httpOptions.headers.append('Authorization', token.getValue());
				}
				resolve(token);
			})
		)
	}


	public getToken() : any {
		var userToken;
		this.loadToken().then((nbToken) => {return nbToken.token;});
	
	}

	/*
	verify(code : string) {
		return this.http.post<apiResponse>(this.url + "/email-verification/" + code, httpOptions)
			.pipe(tap((code:apiResponse) => console.log('verified')),
			catchError(this.handleError<apiResponse>('verify code'))
			);
	}
*/


	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

      // send the error to remote logging infrastructure
			console.error(error); // log to console instead

      // transform error for user consumption
			console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
	  		return of(result as T);
		};
	}
}
