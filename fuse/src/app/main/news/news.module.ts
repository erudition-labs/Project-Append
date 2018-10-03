import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule, MatList, MatListModule } from '@angular/material';


import { FuseSharedModule } from '@fuse/shared.module';
import { NewsComponent } from './news.component';
import { FuseSidebarModule } from '@fuse/components';

const routes = [
    {
        path     : 'news',
        component: NewsComponent
    }
];

@NgModule({
    declarations: [
        NewsComponent
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
        NewsComponent
    ]
})

export class NewsModule
{
}
