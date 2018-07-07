import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit() {
  		let code : string = this.router.url;
		console.log(code);
	}

}
