import { of as observableOf,  Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map, tap 		} from 'rxjs/operators';
import { HttpClient, HttpHeaders 	} from '@angular/common/http';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { switchMap } from 'rxjs/operators';


let counter = 0;

const  httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private users = {
    nick: { name: 'Nick Jones', picture: 'assets/images/nick.png' },
    eva: { name: 'Eva Moor', picture: 'assets/images/eva.png' },
    jack: { name: 'Jack Williams', picture: 'assets/images/jack.png' },
    lee: { name: 'Lee Wong', picture: 'assets/images/lee.png' },
    alan: { name: 'Alan Thompson', picture: 'assets/images/alan.png' },
    kate: { name: 'Kate Martinez', picture: 'assets/images/kate.png' },
  };

  private userArray: any[];


readonly url :  string = "http://localhost:3000/api/v1/profile";
  constructor(
  		private http: HttpClient,
		private authService : NbAuthService) {
    // this.userArray = Object.values(this.users);
  }

  getUsers(): Observable<any> {
    return observableOf(this.users);
  }

  getUserArray(): Observable<any[]> {
    return observableOf(this.userArray);
  }

  getUser(): Observable<any> {
    counter = (counter + 1) % this.userArray.length;
    return observableOf(this.userArray[counter]);
  }


	getProfile() {
		this.authService.getToken()
			.pipe(switchMap((token: NbAuthJWTToken) => {
				if (token.isValid()) {
					httpOptions.headers.append('Authorization', token.getValue());
					return this.http.get(this.url + "profile", httpOptions)
						.pipe(tap((data) => console.log('got profile data')),
						catchError(this.handleError<any>('error data retrievel'))
					);	
				}
			}))
	}

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
