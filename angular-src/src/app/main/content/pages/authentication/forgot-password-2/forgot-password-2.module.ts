import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseForgotPassword2Component } from './forgot-password-2.component';

const routes = [
    {
        path     : 'auth/forgot-password-2',
        component: FuseForgotPassword2Component
    }
];

@NgModule({
    declarations: [
        FuseForgotPassword2Component
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,

        FuseSharedModule,
    ]
})
export class ForgotPassword2Module
{
}
