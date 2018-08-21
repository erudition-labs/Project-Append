import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../@core/auth/auth.service';


@Component({
  selector: 'email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

	messages		: string[] = [];
	errors			: string[] = [];

	constructor(private router				: Router,
				private route 				: ActivatedRoute,
				private authService 		: AuthService) { }

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.authService.verify(params.code).subscribe((result) => {
				if(result !== undefined && result.success) {
					this.messages.push(result.msg);
					this.messages.push("You will be automatically redirected");
					setTimeout(() => {
						return this.router.navigateByUrl("/");
					}, 5000);
				} else {
					this.errors.push("Confirmation Failed");
				}
			});
		});

	}

}
