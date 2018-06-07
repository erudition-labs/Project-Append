import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseMailConfirmComponent } from './mail-confirm.component';

const routes = [
    {
        path     : 'auth/mail-confirm',
        component: FuseMailConfirmComponent
    }
];

@NgModule({
    declarations: [
        FuseMailConfirmComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatIconModule,

        FuseSharedModule
    ]
})
export class MailConfirmModule
{
}
