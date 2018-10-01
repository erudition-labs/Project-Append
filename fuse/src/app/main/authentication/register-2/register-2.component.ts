import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';


import { AuthService } from '../../../../@core/auth/auth.service';
import { UserService } from '../../../../@core/user/user.service';
import { NewUser } from '../../../../@core/user/user.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

export interface Select {
    value: string;
    viewValue: string;
  }

@Component({
    selector     : 'register-2',
    templateUrl  : './register-2.component.html',
    styleUrls    : ['./register-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class Register2Component implements OnInit, OnDestroy
{
    registerForm: FormGroup;

    ranks: Select[] = [
        {value: 'C/Ab', viewValue: 'Airman Basic'},
        {value: 'C/Amn', viewValue: 'Airman'},
        {value: 'C/A1C', viewValue: 'Airman First Class'}
      ];

      teams: Select[] = [
        {value: 'Rifle', viewValue: 'Rifle Team'},
        {value: 'Sword', viewValue: 'Sword Team'},
        {value: 'Color Guard', viewValue: 'Color Gaurd'},
        {value: 'Drill', viewValue: 'Drill Team'}
      ];

      flights: Select[] = [
        {value: 'Alpha', viewValue: 'Alpha Flight'},
        {value: 'Bravo', viewValue: 'Bravo Flight'},
        {value: 'Charlie', viewValue: 'Charlie Flight'},
        {value: 'Delta', viewValue: 'Delta Flight'}
      ];

    private _unsubscribeAll: Subject<any>;
    public signupForm : FormGroup;
	private signupLoading = false;
	private emailValidating = false;
	private signupResult : any;

	public errors: string[] = [];
	public messages: string[] = [];
	public submitted: boolean = false;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private formBuilder: FormBuilder,
		private authService : AuthService,
		private router		: Router,
		private userService	: UserService
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // this.registerForm = this._formBuilder.group({
        //     name           : ['', Validators.required],
        //     email          : ['', [Validators.required, Validators.email]],
        //     password       : ['', Validators.required],
        //     passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        // });
        
        this.createForm();

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('passwordConfirm').updateValueAndValidity();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    private createForm() : void {
        this.registerForm = this.formBuilder.group({
            email: new FormControl('', {
                validators: [Validators.required, Validators.email], 
                asyncValidators: [this.checkEmail.bind(this)],
                updateOn: 'blur'
            }),
            password			: new FormControl('', { validators: [Validators.required] }),
            passwordConfirm     : new FormControl('', { validators: [Validators.required, confirmPasswordValidator]}),
            firstName			: new FormControl('', { validators: [Validators.required] }),
            lastName			: new FormControl('', { validators: [Validators.required] }),
            rank				: new FormControl('', { }),
            flight				: new FormControl('', { validators: [Validators.required] }),
            team				: new FormControl('', { }),
            role				: new FormControl('user', { }),
            phone				: new FormControl('', { validators: [Validators.required] }),
            isChangelogViewed 	: new FormControl(false, { }),
            events				: new FormControl([], { })
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
		this.signupForm.controls.events.markAsDirty();

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
				phone,
				isChangelogViewed,
				events
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
				phone,
				isChangelogViewed,
				events
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

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if ( !control.parent || !control )
    {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return null;
    }

    if ( passwordConfirm.value === '' )
    {
        return null;
    }

    if ( password.value === passwordConfirm.value )
    {
        return null;
    }

    return {'passwordsNotMatching': true};
};
