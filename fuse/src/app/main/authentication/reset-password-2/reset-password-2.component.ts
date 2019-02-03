import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '@core/auth/auth.service';
import { UtilsService } from '@core/utils/utils.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector     : 'reset-password-2',
    templateUrl  : './reset-password-2.component.html',
    styleUrls    : ['./reset-password-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ResetPassword2Component implements OnInit, OnDestroy
{
    resetPasswordForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;
    private _token: string;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _router: Router,
        private _utils: UtilsService,
        private _route: ActivatedRoute
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
        
        this._route.params.subscribe((params) => {
            if(!params.token) {
                return this._router.navigate["login"];
            } else {
                this._token = params.token;
                console.log(this._token);
                this.resetPasswordForm = this._formBuilder.group({
                    name           : ['', Validators.required],
                    email          : ['', [Validators.required, Validators.email]],
                    password       : ['', Validators.required],
                    passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
                });
        
                // Update the validity of the 'passwordConfirm' field
                // when the 'password' field changes
                this.resetPasswordForm.get('password').valueChanges
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe(() => {
                        this.resetPasswordForm.get('passwordConfirm').updateValueAndValidity();
                    });
            }
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

    onSubmit() : void {
       if(this.resetPasswordForm.valid) {
            this._authService.resetPassword(this.resetPasswordForm.get('password').value, this._token).subscribe( result => {
                if(result) {
                    this._utils.success("Password reset successful");
                } else {
                    this._utils.error("Password reset failed");
                }
				return this._router.navigate["login"];;
			});
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


