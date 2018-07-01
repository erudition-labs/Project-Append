import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <p>
      register works!
    </p>
  `,
  styles: []
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
  }

  ngOnInit() {}

}
