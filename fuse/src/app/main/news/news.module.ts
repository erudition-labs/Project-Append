import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule, MatList, MatListModule, MatButtonModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { NewsComponent } from './news.component';
import { FuseSidebarModule } from '@fuse/components';

import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { TuiModule } from 'ngx-tui-editor';

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
        MatButtonModule,
        TuiModule,
        MarkdownModule.forRoot(),
    ],
    exports     : [
        NewsComponent
    ]
})

export class NewsModule
{
}
