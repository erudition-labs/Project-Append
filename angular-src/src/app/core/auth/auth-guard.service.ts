import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

import { selectorAuth } from './auth.reducer';

@Injectable()
export class AuthGuardService implements CanActivate {
	isAuthenticated = false;

	constructor(private store: Store<any>, private router: Router) {
		this.store
			.pipe(select(selectorAuth))
			.subscribe(auth => (this.isAuthenticated = auth.isAuthenticated));
	}
	
	canActivate(): boolean {
		if(!this.isAuthenticated) {
			this.router.navigate(['login']);
			return false;
		}
		return this.isAuthenticated;
	}
}
