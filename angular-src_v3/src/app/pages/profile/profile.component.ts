import { Component, OnInit } from '@angular/core';
import { UserService } from '../../@core/user/user.service';
import { AuthService } from '../../@core/auth/auth.service';


@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService : UserService, private authService : AuthService) { }

	private user Observable<User>;


  ngOnInit() {
  // this.userService.getUser(this.authService.parseToken().sub).subscribe((result) => {
	// 	console.log(result.user);
	// });
	// //console.log(this.authService.parseToken().sub);

	this.user = this.userService.getUser(this.authService.parseToken().sub);
  }

}
