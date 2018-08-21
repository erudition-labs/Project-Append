import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
	FormGroup,
	FormBuilder,
	FormControl,
	Validators
} from '@angular/forms'
import { AuthService } from '../../@core/auth/auth.service';
import { Credentials } from '../../@core/user/credentials.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
	private loginForm: FormGroup;
	private loginLoading = false;
	private loginResult: any;

	private errors: string[] = [];
	private messages: string[] = [];
	private submitted: boolean = false;
	private username: string;

	constructor(
		private authService	: AuthService,
		private formBuilder : FormBuilder,
		private router		: Router) { }

	ngOnInit() {
		this.createForm();
	}

	private createForm() : void {
		this.loginForm = this.formBuilder.group({
			email 		: new FormControl('', { validators: [Validators.required, Validators.email] }),
			password	: new FormControl('', { validators: [Validators.required] })
		});
	}

	public onSubmit() : void {
		this.errors = [];
		this.messages = [];

		this.loginForm.controls.email.markAsDirty();
		this.loginForm.controls.password.markAsDirty();

		const { email, password } = this.loginForm.value;
		const credentials : Credentials = {
			email,
			password
		};

		if(this.loginForm.valid) {
			this.loginLoading = true;
			this.authService.login(credentials).subscribe(
				result => {
					if(result.success) {
						this.loginLoading = false;
						this.username = result.userInfo.firstName;
						this.messages.push(result.message);

						this.authService.setUser(
							result.token,
							result.userInfo,
							result.expiresAt
						);
						setTimeout(() => {
							this.router.navigate(['dashboard']);
						}, 2000);
					} else {
						this.errors.push(result.message);
					}
				}, error => {
					this.loginResult = {
						message: error.error.message,
						state: 'error'
					};
					this.errors.push(error.error.message);
					this.loginLoading = false;
				}
			);
		}
	}
}
