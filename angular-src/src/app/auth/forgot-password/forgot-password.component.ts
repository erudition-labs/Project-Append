import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../@core/user/user.service';

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
				private userService 		: UserService,
				private formBuilder 		: FormBuilder,
				) { }

	ngOnInit() {
		this.createForm();
	}

	private createForm(): void {
		this.emailForm = this.formBuilder.group({
			email : new FormControl('', { validators: [Validators.required, Validators.email] })
		});
	}

	onSubmit() : void {
		if(this.emailForm.valid) {
			this.userService.requestNewPassword(this.emailForm.get('email').value).subscribe( result => {
				setTimeout(() => {
					return this.router.navigateByUrl("auth");
				  }, 3000);
			});
		}
	}

}
