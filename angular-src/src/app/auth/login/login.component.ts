import { Component, OnInit } from '@angular/core';
import { Router,  RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public showingLogin 	= true;
	public showingSignup	= false;

	constructor(public router : Router) { }

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
