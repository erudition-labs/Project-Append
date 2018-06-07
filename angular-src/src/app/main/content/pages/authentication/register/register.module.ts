import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseRegisterComponent } from './register.component';

const routes = [
    {
        path     : 'auth/register',
        component: FuseRegisterComponent
    }
];

@NgModule({
    declarations: [
        FuseRegisterComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,

        FuseSharedModule
    ]
})
export class RegisterModule
{
}
