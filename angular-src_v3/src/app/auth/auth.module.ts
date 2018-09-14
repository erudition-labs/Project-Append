import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [
    LoginComponent,
    LoginFormComponent,
    SignupFormComponent,
    EmailVerificationComponent,


]
})
export class AuthModule { }
