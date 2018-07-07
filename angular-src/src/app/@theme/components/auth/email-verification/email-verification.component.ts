import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../@core/data/auth.service';


@Component({
  selector: 'email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

	constructor(private router				: Router,
				private route 				: ActivatedRoute,
				private authService 		: AuthService) { }

	ngOnInit() {
	//let href : string = this.router.url;
	//	console.log(href.split("/", 2));
	this.route.params.subscribe( (params) => {
	//console.log(params) 
		this.authService.verify(params.code).subscribe((result) => {
			return this.router.navigateByUrl("/");
		});

	});

	}

}
