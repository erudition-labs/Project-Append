import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { AuthService } from '../../../../@core/auth/auth.service';
import { Credentials } from '../../../../@core/user/credentials.model';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '@core/utils/error.service';

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
	private loginLoading = false;
	private loginResult: any;

	public errors: string[] = [];
	public messages: string[] = [];
	public submitted: boolean = false;
	private username: string;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private formBuilder: FormBuilder,
        private authService	: AuthService,
        private router		: Router,
        private toast : ToastrService, 

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

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // this.loginForm = this._formBuilder.group({
        //     email   : ['', [Validators.required, Validators.email]],
        //     password: ['', Validators.required]
        // });
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
						this.username = result.userInfo.firstName;
						this.messages.push(result.message);

						this.authService.setUser(
							result.token,
							result.userInfo,
							result.expiresAt
						);
						setTimeout(() => {
							this.router.navigate(['dashboard']);
                        }, 500);
                        
                        this.success(result.message,"Welcome, " + this.username + "!");
					} else {
                        this.errors.push(result.message);
                        for(let error in this.errors){
                            this.error(error,"Error!");
    
                        }
					}
				}, error => {
					this.loginResult = {
						message: error.error.message,
						state: 'error'
					};
					this.errors.push(error.error.message);
                    
				}
			);
		}
    }
    
    private error(msg : string, title: string) : void {
		this.toast.error(msg, title, {
			timeOut: 5000,
			closeButton: true,
			progressBar: true,
			progressAnimation: 'decreasing',
			positionClass: 'toast-top-right',
		  });
	}

	private success(msg: string, title: string) : void {
		this.toast.success(msg, title, {
			timeOut: 5000,
			closeButton: true,
			progressBar: true,
			progressAnimation: 'decreasing',
			positionClass: 'toast-top-right',
		  });
  }
    
}
