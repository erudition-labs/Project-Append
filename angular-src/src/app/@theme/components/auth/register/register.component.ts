/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Inject 	} from '@angular/core';
import { Router 			} from '@angular/router';
import { getDeepFromObject 	} from '@nebular/auth/helpers';
import { NbAuthService, 
	NbAuthResult, 
	NB_AUTH_OPTIONS,
	NbAuthSocialLink } from '@nebular/auth';
import { AuthService } from '../../../../@core/data/auth.service'


@Component({
  selector: 'nb-register',
  styleUrls: ['./register.component.scss'],
  template: `
    <nb-auth-block>
      <h2 class="title">Sign Up</h2>
      <form (ngSubmit)="register()" #form="ngForm">
        <div *ngIf="showMessages.error && errors && errors.length > 0 && !submitted"
             class="alert alert-danger" role="alert">
          <div><strong>Oh snap!</strong></div>
          <div *ngFor="let error of errors">{{ error }}</div>
        </div>
        <div *ngIf="showMessages.success && messages && messages.length > 0 && !submitted"
             class="alert alert-success" role="alert">
          <div><strong>Hooray!</strong></div>
          <div *ngFor="let message of messages">{{ message }}</div>
        </div>
        <div class="form-group">
          <label for="input-name" class="sr-only">First name</label>
          <input name="firstName" [(ngModel)]="user.firstName" id="input-name" #firstName="ngModel"
                 class="form-control" placeholder="First name"
                 [class.form-control-danger]="firstName.invalid && firstName.touched"
                 [required]="true"
                 [minlength]="true"
                 [maxlength]="true"
                 autofocus>
          <small class="form-text error" *ngIf="firstName.invalid && firstName.touched && firstName.errors?.required">
            First name is required!
          </small>
          <small
            class="form-text error"
            *ngIf="firstName.invalid && firstName.touched && (firstName.errors?.minlength || firstName.errors?.maxlength)">
            First name should contains
            from {{getConfigValue('forms.validation.firstName.minLength')}}
            to {{getConfigValue('forms.validation.firstName.maxLength')}}
            characters
          </small>
        </div>

        <div class="form-group">
          <label for="input-name-last" class="sr-only">Last name</label>
          <input name="lastName" [(ngModel)]="user.lastName" id="input-name-last" #lastName="ngModel"
                 class="form-control" placeholder="Last name"
                 [class.form-control-danger]="lastName.invalid && lastName.touched"
                 [required]="true"
                 [minlength]="true"
                 [maxlength]="true"
                 autofocus>
          <small class="form-text error" *ngIf="lastName.invalid && lastName.touched && lastName.errors?.required">
            Last name is required!
          </small>
          <small
            class="form-text error"
            *ngIf="lastName.invalid && lastName.touched && (lastName.errors?.minlength || lastName.errors?.maxlength)">
            Last name should contains
            from {{getConfigValue('forms.validation.lastName.minLength')}}
            to {{getConfigValue('forms.validation.lastName.maxLength')}}
            characters
          </small>
        </div>

        <div class="form-group">
          <label for="input-rank" class="sr-only">Rank</label>
          <input name="rank" [(ngModel)]="user.rank" id="input-rank" #rank="ngModel"
                 class="form-control" placeholder="Rank"
                 [class.form-control-danger]="rank.invalid && rank.touched"
                 [required]="true"
                 [minlength]="true"
                 [maxlength]="true"
                 autofocus>
          <small class="form-text error" *ngIf="rank.invalid && rank.touched && rank.errors?.required">
            Rank is required!
          </small>
          <small
            class="form-text error"
            *ngIf="rank.invalid && rank.touched && (rank.errors?.minlength || rank.errors?.maxlength)">
            Rank should contains
            from {{getConfigValue('forms.validation.firstName.minLength')}}
            to {{getConfigValue('forms.validation.firstName.maxLength')}}
            characters
          </small>
        </div>

        <div class="form-group">
          <label for="input-flight" class="sr-only">Flight</label>
          <input name="flight" [(ngModel)]="user.flight" id="input-flight" #flight="ngModel"
                 class="form-control" placeholder="Flight"
                 [class.form-control-danger]="flight.invalid && flight.touched"
                 [required]="true"
                 [minlength]="true"
                 [maxlength]="true"
                 autofocus>
          <small class="form-text error" *ngIf="flight.invalid && flight.touched && flight.errors?.required">
            Flight is required!
          </small>
          <small
            class="form-text error"
            *ngIf="flight.invalid && flight.touched && (flight.errors?.minlength || flight.errors?.maxlength)">
            Flight name should contains
            from {{getConfigValue('forms.validation.flight.minLength')}}
            to {{getConfigValue('forms.validation.flight.maxLength')}}
            characters
          </small>
        </div>

        <div class="form-group">
          <label for="input-team" class="sr-only">Team</label>
          <input name="team" [(ngModel)]="user.team" id="input-team" #team="ngModel"
                 class="form-control" placeholder="Team"
                 [class.form-control-danger]="team.invalid && team.touched"
                 [required]="true"
                 [minlength]="true"
                 [maxlength]="true"
                 autofocus>
          <small class="form-text error" *ngIf="team.invalid && team.touched && team.errors?.required">
            Team name is required!
          </small>
          <small
            class="form-text error"
            *ngIf="team.invalid && team.touched && (team.errors?.minlength || team.errors?.maxlength)">
            Team name should contains
            from {{getConfigValue('forms.validation.team.minLength')}}
            to {{getConfigValue('forms.validation.team.maxLength')}}
            characters
          </small>
        </div>

        <div class="form-group">
          <label for="input-email" class="sr-only">Email address</label>
          <input name="email" [(ngModel)]="user.email" id="input-email" #email="ngModel"
                 class="form-control" placeholder="Email address" pattern=".+@.+\..+"
                 [class.form-control-danger]="email.invalid && email.touched"
                 [required]="getConfigValue('forms.validation.email.required')">
          <small class="form-text error" *ngIf="email.invalid && email.touched && email.errors?.required">
            Email is required!
          </small>
          <small class="form-text error"
                 *ngIf="email.invalid && email.touched && email.errors?.pattern">
            Email should be the real one!
          </small>
        </div>
        <div class="form-group">
          <label for="input-password" class="sr-only">Password</label>
          <input name="password" [(ngModel)]="user.password" type="password" id="input-password"
                 class="form-control" placeholder="Password" #password="ngModel"
                 [class.form-control-danger]="password.invalid && password.touched"
                 [required]="getConfigValue('forms.validation.password.required')"
                 [minlength]="getConfigValue('forms.validation.password.minLength')"
                 [maxlength]="getConfigValue('forms.validation.password.maxLength')">
          <small class="form-text error" *ngIf="password.invalid && password.touched && password.errors?.required">
            Password is required!
          </small>
          <small
            class="form-text error"
            *ngIf="password.invalid && password.touched && (password.errors?.minlength || password.errors?.maxlength)">
            Password should contains
            from {{ getConfigValue('forms.validation.password.minLength') }}
            to {{ getConfigValue('forms.validation.password.maxLength') }}
            characters
          </small>
        </div>
        <div class="form-group">
          <label for="input-re-password" class="sr-only">Repeat password</label>
          <input
            name="rePass" [(ngModel)]="user.confirmPassword" type="password" id="input-re-password"
            class="form-control" placeholder="Confirm Password" #rePass="ngModel"
            [class.form-control-danger]="(rePass.invalid || password.value != rePass.value) && rePass.touched"
            [required]="getConfigValue('forms.validation.password.required')">
          <small class="form-text error"
                 *ngIf="rePass.invalid && rePass.touched && rePass.errors?.required">
            Password confirmation is required!
          </small>
          <small
            class="form-text error"
            *ngIf="rePass.touched && password.value != rePass.value && !rePass.errors?.required">
            Password does not match the confirm password.
          </small>
        </div>
        <div class="form-group accept-group col-sm-12" *ngIf="getConfigValue('forms.register.terms')">
          <nb-checkbox name="terms" [(ngModel)]="user.terms" [required]="getConfigValue('forms.register.terms')">
            Agree to <a href="#" target="_blank"><strong>Terms & Conditions</strong></a>
          </nb-checkbox>
        </div>
        <button [disabled]="submitted || !form.valid" class="btn btn-block btn-hero-success"
                [class.btn-pulse]="submitted">
          Register
        </button>
      </form>
      <div class="links">
        <ng-container *ngIf="socialLinks && socialLinks.length > 0">
          <small class="form-text">Or connect with:</small>
          <div class="socials">
            <ng-container *ngFor="let socialLink of socialLinks">
              <a *ngIf="socialLink.link"
                 [routerLink]="socialLink.link"
                 [attr.target]="socialLink.target"
                 [attr.class]="socialLink.icon"
                 [class.with-icon]="socialLink.icon">{{ socialLink.title }}</a>
              <a *ngIf="socialLink.url"
                 [attr.href]="socialLink.url"
                 [attr.target]="socialLink.target"
                 [attr.class]="socialLink.icon"
                 [class.with-icon]="socialLink.icon">{{ socialLink.title }}</a>
            </ng-container>
          </div>
        </ng-container>
        <small class="form-text">
          Already have an account? <a routerLink="../login"><strong>Sign in</strong></a>
        </small>
      </div>
    </nb-auth-block>
  `,
})
export class NgxRegisterComponent {

	redirectDelay	: number = 10000;
	showMessages	: any = {};


	submitted = false;
	errors		: string[] = [];
	messages	: string[] = [];
	user		: any = {};

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
			  protected router: Router,
			  private authService : AuthService) {

    this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
    this.showMessages = this.getConfigValue('forms.register.showMessages');
  }

	register(): void {
		this.errors = [];
		this.messages = [];
		this.submitted = true;

		//nebular template code
	/*
    this.service.register(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
	});*/

	this.authService.create(this.user).subscribe((result) => {
		this.submitted = false;
		console.log(result);
		if(result.success) {
			this.messages.push(result.msg);
			setTimeout(() => {
			return this.router.navigateByUrl("/auth/login");
			}, 10000);
		} else {
			this.errors.push(result.msg);
		}
	});
  }
  
	getConfigValue(key: string): any {
		return getDeepFromObject(this.options, key, null);
	}
}
