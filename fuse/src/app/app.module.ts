import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { DashboardModule } from './main/dashboard/dashboard.module';
import { Login2Module } from './main/authentication/login-2/login-2.module';
import { Register2Module } from './main/authentication/register-2/register-2.module';
import { ResetPassword2Module } from './main/authentication/reset-password-2/reset-password-2.module';
import { ForgotPassword2Module } from './main/authentication/forgot-password-2/forgot-password-2.module';
import { MailConfirmModule } from './main/authentication/mail-confirm/mail-confirm.module';
import { LockModule } from './main/authentication/lock/lock.module';
import { Login2Component } from './main/authentication/login-2/login-2.component';
import { ToastrModule } from 'ngx-toastr';
// import { AuthModule } from './main/authentication/auth.module';




const appRoutes: Routes = [
    {
        path      : '**',
        redirectTo: 'dashboard',
        
    },
    {
        path    : 'login',
        component: Login2Component
    }
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        //npm installs
        ToastrModule.forRoot(),

        // App modules
        LayoutModule,
        SampleModule,
        DashboardModule,
        Login2Module,
        Register2Module,
        ResetPassword2Module,
        MailConfirmModule,
        ForgotPassword2Module,
        LockModule,
        // AuthModule
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
