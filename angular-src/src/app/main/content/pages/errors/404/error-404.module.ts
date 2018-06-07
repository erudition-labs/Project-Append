import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseError404Component } from './error-404.component';

const routes = [
    {
        path     : 'errors/error-404',
        component: FuseError404Component
    }
];

@NgModule({
    declarations: [
        FuseError404Component
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatIconModule,

        FuseSharedModule
    ]
})
export class Error404Module
{
}
