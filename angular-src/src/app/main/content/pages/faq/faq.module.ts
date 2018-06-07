import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatExpansionModule, MatIconModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FaqService } from './faq.service';
import { FuseFaqComponent } from './faq.component';

const routes = [
    {
        path     : 'faq',
        component: FuseFaqComponent,
        resolve  : {
            faq: FaqService
        }
    }
];

@NgModule({
    declarations: [
        FuseFaqComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatExpansionModule,
        MatIconModule,

        FuseSharedModule
    ],
    providers   : [
        FaqService
    ]
})
export class FaqModule
{
}
