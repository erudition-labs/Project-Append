import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseCountdownModule } from '@fuse/components';

import { FuseComingSoonComponent } from './coming-soon.component';

const routes = [
    {
        path     : 'coming-soon',
        component: FuseComingSoonComponent
    }
];

@NgModule({
    declarations: [
        FuseComingSoonComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,

        FuseSharedModule,
        FuseCountdownModule
    ]
})
export class ComingSoonModule
{
}
