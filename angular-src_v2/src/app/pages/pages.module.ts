import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	HttpClientModule,
	HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PagesRoutingModule } from './pages-routing.module';

import { SharedModule } from '@app/shared';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

import { ParentComponent } from '../examples/theming/parent/parent.component';
import { ChildComponent } from '../examples/theming/child/child.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { EventsComponent } from './events/events.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';

@NgModule({
  imports: [
  CommonModule,
  SharedModule,
  PagesRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  ],
  declarations: [
  LoginComponent, 
  LoginFormComponent, 
  SignupFormComponent,
  ParentComponent,
  ChildComponent,
  EventsComponent,
  EmailVerificationComponent,
  ]
})
export class PagesModule { 
	constructor() {}
}

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(
		http,
		`${environment.i18nPrefix}/assets/i18n/examples/`,
		'.json'
	);
}
