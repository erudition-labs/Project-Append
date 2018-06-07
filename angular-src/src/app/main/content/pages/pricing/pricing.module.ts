import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatDividerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FusePricingStyle1Component } from './style-1/style-1.component';
import { FusePricingStyle2Component } from './style-2/style-2.component';
import { FusePricingStyle3Component } from './style-3/style-3.component';

const routes = [
    {
        path     : 'pricing/style-1',
        component: FusePricingStyle1Component
    },
    {
        path     : 'pricing/style-2',
        component: FusePricingStyle2Component
    },
    {
        path     : 'pricing/style-3',
        component: FusePricingStyle3Component
    }
];

@NgModule({
    declarations: [
        FusePricingStyle1Component,
        FusePricingStyle2Component,
        FusePricingStyle3Component
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,

        FuseSharedModule
    ]
})
export class PricingModule
{
}
