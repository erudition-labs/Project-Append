import { Component, OnInit } from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	FormControl,
	Validators
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


import { AuthService } from '../../@core/auth/auth.service';
import { UserService } from '../../@core/user/user.service';
import { NewUser } from '../../@core/user/user.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
	public signupForm : FormGroup;
	private signupLoading = false;
	private emailValidating = false;
	private signupResult : any;

	public errors: string[] = [];
	public messages: string[] = [];
	public submitted: boolean = false;

	constructor(
		private formBuilder : FormBuilder,
		private authService : AuthService,
		private router		: Router,
		private userService	: UserService
	) { }

	ngOnInit() {
		this.createForm();
	}

	private createForm() : void {
		this.signupForm = this.formBuilder.group({
			email: new FormControl('', {
				validators: [Validators.required, Validators.email], 
				asyncValidators: [this.checkEmail.bind(this)],
				updateOn: 'blur'
			}),
			password	: new FormControl('', { validators: [Validators.required] }),
			firstName	: new FormControl('', { validators: [Validators.required] }),
			lastName	: new FormControl('', { validators: [Validators.required] }),
			rank		: new FormControl('', { }),
			flight		: new FormControl('', { validators: [Validators.required] }),
			team		: new FormControl('', { }),
			role		: new FormControl('user', { }),
			phone		: new FormControl('', { validators: [Validators.required] })
		});
	}

	private checkEmail(control: FormControl) : any {
		this.emailValidating = true;
		const email = control.value.toLowerCase();

		return this.userService.checkEmail(email).pipe(
			map(
				result => {
					this.emailValidating = false;
					if(result.emailTaken) {
						return { emailTaken: true };
					}
					return null;
				}, error => {
					console.log(error);
					this.emailValidating = false;
				}
			)
		);
	}

	public onSubmit() : void {
		this.messages = [];
		this.errors = [];

		this.signupForm.controls.email.markAsDirty();
		this.signupForm.controls.password.markAsDirty();
		this.signupForm.controls.firstName.markAsDirty();
		this.signupForm.controls.lastName.markAsDirty();
		this.signupForm.controls.rank.markAsDirty();
		this.signupForm.controls.flight.markAsDirty();
		this.signupForm.controls.team.markAsDirty();
		this.signupForm.controls.role.markAsDirty();
		this.signupForm.controls.phone.markAsDirty();

		if(this.signupForm.valid) {
			this.signupLoading = true;
			const {
				email, 
				password,
				firstName,
				lastName,
				rank,
				flight,
				team,
				role,
				phone
			} = this.signupForm.value;

			const newUser : NewUser = {
				email,
				password,
				firstName,
				lastName,
				rank,
				flight,
				team,
				role,
				phone
			};
			
			this.authService.signup(newUser).subscribe(
				result => {
					if(result.success) {
						this.signupResult = {
							message: result.message,
							state: 'success'
						};

						this.messages.push(result.message);
						this.signupLoading = false;

						setTimeout(() => {
							this.router.navigate(['dashboard']);
						}, 2000);
					} else {
						this.errors.push(result.message);
					}
				}, error => {
					this.signupResult = {
						message: error.error.message,
						state: 'error'
					};
					this.signupLoading = false;
				}
			);
		}
	}
}
