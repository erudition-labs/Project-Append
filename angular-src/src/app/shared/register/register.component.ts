import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

constructor(private authService : AuthService) { 

	let user : User = {
		firstName : "bob",
		lastName : "billy",
		email : "lenoxx.nilson@lvory0ak.com",
		rank: "god",
		flight : "fuck u",
		team : "A team",
		password : "fuck off"
	};
	
	this.authService.create(user).subscribe(data => console.log(data));
	let user1 : User = {
		email : "sammie.johnie@lvory0ak.com",
		password : "FuckYOU"
	}

	this.authService.authenticate(user1).subscribe(data => {
		if(data.success) {
			this.authService.storeUserData(data.token, data.user);
		}
	});

	this.authService.getProfile().subscribe(data => console.log(data));
  }

  ngOnInit() {}

}
