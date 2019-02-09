import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
    FormControl
} from '@angular/forms';
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
    selector: 'register-2',
    templateUrl: './register-2.component.html',
    styleUrls: ['./register-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class Register2Component implements OnInit, OnDestroy {
    registerForm: FormGroup;

    public ranks: Select[] = [
        { value: 'C/Ab', viewValue: 'Airman Basic' },
        { value: 'C/Amn', viewValue: 'Airman' },
        { value: 'C/A1C', viewValue: 'Airman First Class' },
        { value: 'C/SrArm', viewValue: 'Senior Airman' },
        { value: 'C/SSgt', viewValue: 'Staff Sergeant' },
        { value: 'C/TSgt', viewValue: 'Technical Sergeant' },
        { value: 'C/MSgt', viewValue: 'Master Sergeant' },
        { value: 'C/SMSgt', viewValue: 'Senior Master Sergeant' },
        { value: 'C/CMSgt', viewValue: 'Chief Master Sergeant' },
        { value: 'C/2LT', viewValue: 'Second Lieutenant' },
        { value: 'C/1LT', viewValue: 'First Lieutenant' },
        { value: 'C/Capt', viewValue: 'Captain' },
        { value: 'C/Maj', viewValue: 'Major' },
    ];
    public teams: Select[] = [
        { value: 'Rifle', viewValue: 'Rifle Team' },
        { value: 'Sword', viewValue: 'Sword Team' },
        { value: 'Color Guard', viewValue: 'Color Gaurd' },
        { value: 'Drill', viewValue: 'Drill Team' }
    ];
    public flights: Select[] = [
        { value: 'Alpha', viewValue: 'Alpha Flight' },
        { value: 'Bravo', viewValue: 'Bravo Flight' },
        { value: 'Charlie', viewValue: 'Charlie Flight' },
        { value: 'Delta', viewValue: 'Delta Flight' }
    ];

    private _unsubscribeAll: Subject<any>;
    public signupSuccess = false;
    private emailValidating = false;
    private signupResult: any;
    public tempEmail: String;

    public errors: string[] = [];
    public messages: string[] = [];
    public submitted: boolean = false;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private userService: UserService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
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
    ngOnInit(): void {
        // this.registerForm = this._formBuilder.group({
        //     name           : ['', Validators.required],
        //     email          : ['', [Validators.required, Validators.email]],
        //     password       : ['', Validators.required],
        //     passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        // });

        this.createForm();

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm
            .get('password')
            .valueChanges.pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm
                    .get('passwordConfirm')
                    .updateValueAndValidity();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    private createForm(): void {
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
            events				: new FormControl([], { }),
            fullName			: new FormControl('', { })
        });

        this.signupSuccess = false;
    }

    private checkEmail(control: FormControl): any {
        this.emailValidating = true;
        const email = control.value.toLowerCase();

        return this.userService.checkEmail(email).pipe(
            map(
                result => {
                    this.emailValidating = false;
                    if (result.emailTaken) {
                        return { emailTaken: true };
                    }
                    return null;
                },
                error => {
                    console.log(error);
                    this.emailValidating = false;
                }
            )
        );
    }

    public onSubmit(): void {
        this.messages = [];
        this.errors = [];

        this.registerForm.controls.email.markAsDirty();
        this.registerForm.controls.password.markAsDirty();
        this.registerForm.controls.firstName.markAsDirty();
        this.registerForm.controls.lastName.markAsDirty();
        this.registerForm.controls.rank.markAsDirty();
        this.registerForm.controls.flight.markAsDirty();
        this.registerForm.controls.team.markAsDirty();
        this.registerForm.controls.role.markAsDirty();
        this.registerForm.controls.phone.markAsDirty();
        this.registerForm.controls.events.markAsDirty();

        if (this.registerForm.valid) {
            const {
                email,
                password,
                firstName,
                lastName,
                fullName,
                rank,
                flight,
                team,
                role,
                phone,
                isChangelogViewed,
                events
            } = this.registerForm.value;

            const newUser: NewUser = {
                email,
                password,
                firstName,
                lastName,
                fullName,
                rank,
                flight,
                team,
                role,
                phone,
                isChangelogViewed,
                events
            };

            newUser.fullName = newUser.firstName + " " + newUser.lastName;
            this.authService.signup(newUser).subscribe(
                result => {
                    if (result.success) {
                        this.signupResult = {
                            message: result.message,
                            state: 'success'
                        };

                        this.messages.push(result.message);
                        this.tempEmail = newUser.email;
                        this.signupSuccess = true;

                        setTimeout(() => {
                            this.router.navigate(['login']);
                        }, 4000);
                    } else {
                        this.errors.push(result.message);
                    }
                },
                error => {
                    this.signupResult = {
                        message: error.error.message,
                        state: 'error'
                    };
                    this.signupSuccess = false;
                }
            );
        } else {
            console.log('Not Valid');
        }
    }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { passwordsNotMatching: true };
};
