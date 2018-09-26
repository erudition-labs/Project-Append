import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../@core/auth/auth.service';

import {
	FormGroup,
	FormArray,
	FormBuilder,
	FormControl,
	Validators
} from '@angular/forms';


@Component({
  selector: 'email-verification',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

	messages		: string[] = [];
	errors			: string[] = [];
	emailForm		: FormGroup;

	constructor(private router				: Router,
				private route 				: ActivatedRoute,
				private authService 		: AuthService,
				private formBuilder 		: FormBuilder,
				) { }

	ngOnInit() {
		this.createForm();
		/*this.route.params.subscribe((params) => {
			this.authService.verify(params.code).subscribe((result) => {
				if(result !== undefined && result.success) {
					this.messages.push(result.msg);
					this.messages.push("You will be automatically redirected");
					setTimeout(() => {
						return this.router.navigateByUrl("dashboard");
					}, 5000);
				} else {
          	this.errors.push("Confirmation Failed");
          setTimeout(() => {
            return this.router.navigateByUrl("dashboard");
          }, 2000);
				}
			});
		});*/

	}

	private createForm(): void {
		this.emailForm = this.formBuilder.group({
			email : new FormControl('', { validators: [Validators.required, Validators.email] })
		});
	}

	onSubmit() : void {

	}

}
