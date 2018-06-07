import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseResetPasswordComponent } from './reset-password.component';

const routes = [
    {
        path     : 'auth/reset-password',
        component: FuseResetPasswordComponent
    }
];

@NgModule({
    declarations: [
        FuseResetPasswordComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,

        FuseSharedModule
    ]
})
export class ResetPasswordModule
{
}
