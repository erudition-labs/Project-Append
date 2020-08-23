import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { ForgotPassword2Component } from './forgot-password-2.component';

const routes = [
    {
        path     : 'forgot-password',
        component: ForgotPassword2Component
    }
];

@NgModule({
    declarations: [
        ForgotPassword2Component
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,

        FuseSharedModule,
    ]
})
export class ForgotPassword2Module
{
}
