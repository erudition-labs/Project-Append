import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { MailConfirmComponent } from './mail-confirm.component';

const routes: Routes = [
    {
        path     : 'mail-confirm/:code',
        component: MailConfirmComponent
    },
    {
        path: 'mail-confirm',
        redirectTo: '/login'
    }
];

@NgModule({
    declarations: [
        MailConfirmComponent
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
