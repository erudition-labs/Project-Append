import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public showingLogin 	= true;
	public showingSignup	= false;

	constructor() { }

	ngOnInit() {
	}

	public showLogin() : void {
		this.showingLogin 	= true;
		this.showingSignup	= false;
	}

	public showSignup() : void {
		this.showingLogin 	= false;
		this.showingSignup	= true;
	}

}
