import { Component, OnInit } from '@angular/core';
import { UserService } from '../../@core/data/users.service';

@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService : UserService) { }

  ngOnInit() {
  /*this.userService.getProfile().subscribe((result) => {
		console.log(result.data);
	});*/
  }

}
