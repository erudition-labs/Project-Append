import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { Credentials } from '../../../../@core/user/credentials.model';
import { ToastrService } from 'ngx-toastr';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { Login, LoginSuccess } from '@core/store/auth/auth.actions';


@Component({
    selector     : 'login-2',
    templateUrl  : './login-2.component.html',
    styleUrls    : ['./login-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class Login2Component implements OnInit
{
    public loginForm: FormGroup;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private toast: ToastrService, 
        private _store: Store,
        private _actions$: Actions

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
    }

    ngOnInit(): void {
        this.createForm();
    }

    private createForm() : void {
		this.loginForm = this._formBuilder.group({
			email 		: new FormControl('', { validators: [Validators.required, Validators.email] }),
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
            this._store.dispatch(new Login(credentials));
            this._actions$.pipe(ofActionDispatched(LoginSuccess))
                .subscribe(() => {
                    setTimeout(() => {
                        this._router.navigate(['dashboard']);
                    });
                });
		}
    }
}
