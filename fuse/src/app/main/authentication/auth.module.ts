import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Login2Module } from './login-2/login-2.module';
import { Register2Module } from './register-2/register-2.module';
import { ResetPassword2Module } from './reset-password-2/reset-password-2.module';
import { ForgotPassword2Module } from './forgot-password-2/forgot-password-2.module';
import { MailConfirmModule } from './mail-confirm/mail-confirm.module';
import { LockModule } from './lock/lock.module';

@NgModule({
  imports: [
    CommonModule,
    Login2Module,
    Register2Module,
    ResetPassword2Module,
    MailConfirmModule,
    ForgotPassword2Module,
    LockModule, 

  ],
  declarations: [
]
})
export class AuthModule { }
