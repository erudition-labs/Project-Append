import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { Register2Component } from './register-2.component';

const routes = [
    {
        path     : 'register',
        component: Register2Component
    }
];

@NgModule({
    declarations: [
        Register2Component
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,

        FuseSharedModule
    ]
})
export class Register2Module
{
}
