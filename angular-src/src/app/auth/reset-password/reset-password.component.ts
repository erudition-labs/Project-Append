import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../@core/user/user.service';

import {
	FormGroup,
	FormBuilder,
	FormControl,
	Validators
} from '@angular/forms';


@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class PasswordResetComponent implements OnInit {

	messages		: string[] = [];
	errors			: string[] = [];
	newPassForm		: FormGroup;


	constructor(private router				: Router,
				private route 				: ActivatedRoute,
				private userService 		: UserService,
				private formBuilder 		: FormBuilder,) { }

	ngOnInit() {
		this.createForm();
		console.log('asdfasdfasddsafasdfs');
		/*
		this.route.params.subscribe((params) => {
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
		});
*/
	}

	private createForm(): void {
		this.newPassForm = this.formBuilder.group({
			password 		: new FormControl('', { validators: [Validators.required] }),
			confirmPassword : new FormControl('', { validators: [Validators.required] }),
		}, this.pwdMatchValidator);
	}

	onSubmit() : void {
		if(this.newPassForm.valid) {
			this.route.params.subscribe((params) => {
				//params.token
			});
		}
	}
	pwdMatchValidator(frm: FormGroup) {
		return frm.get('password').value === frm.get('confirmPassword').value
		   ? null : {'mismatch': true};
	 }

}
