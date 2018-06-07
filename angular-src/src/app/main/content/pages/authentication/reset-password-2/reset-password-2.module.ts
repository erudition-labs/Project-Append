import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseResetPassword2Component } from './reset-password-2.component';

const routes = [
    {
        path     : 'auth/reset-password-2',
        component: FuseResetPassword2Component
    }
];

@NgModule({
    declarations: [
        FuseResetPassword2Component
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,

        FuseSharedModule
    ]
})
export class ResetPassword2Module
{
}
