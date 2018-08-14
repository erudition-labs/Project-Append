import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NewUser } from './../user/user.model';
import { Credentials } from './../user/credentials.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public http: HttpClient, public router: Router) {}

  public isAuthenticated(): boolean {
    // Get the time the token expires
    const expiresAt = localStorage.getItem('expiresAt');

    // If there's no expiresAt value, make
    // the user log in
    if (!expiresAt) {
      return false;
    }
    // Our indication as to whether the user is authenticated or not
    // is if they have an unexpired token. Return a boolean that compares
    // the current time with the token expiry time. The expiresAt value
    // needs to be parsed because it is stored as a string
    return new Date().getTime() < parseInt(expiresAt);
  }

  public login(credentials: Credentials): Observable<any> {
    // We're using the spread syntax to get the
    // individual properties off the supplied user
    // object onto a new object
    return this.http.post(`/api/authenticate`, { ...credentials });
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  private setUserInfo(userInfo: any): void {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  private setExpiresAt(expiresAt: number): void {
    // When we compare the current time against the expires at time
    // later, we do so using a JavaScript Date object. The Date
    // object deals with timestamps differently than how we have them
    // in the token, so we need to multiple by 1000
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt * 1000));
  }

  public getUserInfo(): any {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public setUser(token: string, userInfo: any, expiresAt: number): void {
    // using local storage is only required
    // when not using cookies to store the JWT
    // this.setToken(token);
    this.setUserInfo(userInfo);
    this.setExpiresAt(expiresAt);
  }

  public signup(user: NewUser): Observable<any> {
    // We're using the spread syntax to get the
    // individual properties off the supplied user
    // object onto a new object
    return this.http.post(`/api/users`, { ...user });
  }

  // public logout(): Observable<any> {
  //   return this.http.post('/api/logout', {});
  // }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('expiresAt');
    this.router.navigate(['login']);
  }

  public isAdmin(): boolean {
    const userInfo = this.getUserInfo();
    if (!userInfo) {
      return false;
    }
    return userInfo.role === 'admin';
  }

  public userHasRole(expectedRole: string): boolean {
    const userInfo = this.getUserInfo();
    return expectedRole === userInfo.role;
  }
}
