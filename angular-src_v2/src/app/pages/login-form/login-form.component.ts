import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
	FormGroup,
	FormBuilder,
	FormControl,
	Validators
} from '@angular/forms'
import { AuthService } from '../../core/auth/auth.service';
import { Credentials } from '../../core/user/credentials.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
	private loginForm: FormGroup;
	private loginLoading = false;
	private loginResult: any;

	constructor(
		private authService	: AuthService,
		private formBuilder : FormBuilder,
		private router		: Router) { }

	ngOnInit() {
		this.createForm();
	}

	private createForm() : void {
		this.loginForm = this.formBuilder.group({
			email 		: new FormControl('', { validators: [Validators.required] }),
			password	: new FormControl('', { validators: [Validators.required] })
		});
	}

	public onSubmit() : void {
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
					console.log(result);
					this.loginLoading = false;
					this.authService.setUser(
						result.token,
						result.userInfo,
						result.expiresAt
					);
					this.router.navigate(['about']);
				}, error => {
					this.loginResult = {
						message: error.error.message,
						state: 'error'
					};
					this.loginLoading = false;
				}
			);
		}
	}
}
