import { Component, OnInit } from '@angular/core';
import { Router, ActivatdRoute } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

	constructor(private router		: Router,
				private route		: ActivatedRoute,
				private authService	: AuthService) { }

	ngOnInit() {
		this.route.params.subscribe((params) => {
  			this.authService.verify(params.token).subscribe((result) => {
				if(result !== undefined && result.success) {
					//push some message to user
					setTimeout(() => {
						return this.router.navigate(['dashboard']);
					});
				} else {
					//push some error message
				}
			});
		});
	}

}
