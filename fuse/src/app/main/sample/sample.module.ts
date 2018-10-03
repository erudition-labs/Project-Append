import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule, MatList, MatListModule } from '@angular/material';


import { FuseSharedModule } from '@fuse/shared.module';
import { SampleComponent } from './sample.component';
import { FuseSidebarModule } from '@fuse/components';

const routes = [
    {
        path     : 'sample',
        component: SampleComponent
    }
];

@NgModule({
    declarations: [
        SampleComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,


        MatIconModule,
        MatListModule,
    ],
    exports     : [
        SampleComponent
    ]
})

export class SampleModule
{
}
