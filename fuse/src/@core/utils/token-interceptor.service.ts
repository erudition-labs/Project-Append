import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { AuthState } from '../store/auth/auth.state';
import { UtilsService } from './utils.service';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private _store: Store,
              private _utils: UtilsService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this._store.selectSnapshot(AuthState.token)}`
      }
    });
    // next.handle returns an observable
    // which we can pipe other operators onto.
    // We use pipe and tap in RxJS 6, but this
    // would have been the `do` operator previously
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          //client side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          //server side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        //console.log(error)
        if(error.status == 0) {
          this._utils.error('Internal Server Error');
        } else {
          this._utils.error(error && error.error ? error.error : '');
        }
        return throwError(errorMessage);
      })
    )
    /*  tap(
        (response: HttpEvent<any>) => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            //if (err.status === 401) {
              // if the request is unauthorized,
              // make the user log in again
             // this._store.dispatch(new Logout); //should get caught in main app component and redirected 
           // }

           this._utils.error(err && err.error ? err.error : '');

          }
        }
      )*/
  
  }
}
