import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { Login2Component } from './login-2/login-2.component';
import { Register2Component } from './register-2/register-2.component';
import { MailConfirmComponent } from './mail-confirm/mail-confirm.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [
    Login2Component,
    Register2Component,
    MailConfirmComponent,


]
})
export class AuthModule { }
