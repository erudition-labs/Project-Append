import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule, MatList, MatListModule, MatButtonModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { NewsComponent } from './news.component';
import { FuseSidebarModule } from '@fuse/components';

import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { TuiModule } from 'ngx-tui-editor';
import { NewsDialogComponent } from './news-dialog/news-dialog.component';
import { MatDialogModule } from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';

const routes = [
    {
        path     : 'news',
        component: NewsComponent
    }
];

@NgModule({
    declarations: [
        NewsComponent,
        NewsDialogComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,


        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatDialogModule,
        MatStepperModule,
        TuiModule,
        MarkdownModule.forRoot(),
    ],
    exports     : [
        NewsComponent,
        ],
    entryComponents : [
        NewsDialogComponent
    ]
})

export class NewsModule
{
}
