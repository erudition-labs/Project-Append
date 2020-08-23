import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule, MatList, MatListModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { NewsComponent } from './news.component';
import { FuseSidebarModule } from '@fuse/components';

import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { NewsDialogComponent } from './news-dialog/news-dialog.component';
import { MatDialogModule } from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import { QuillModule } from 'ngx-quill'
import { AuthGuardService as AuthGuard } from '@core/auth/auth-guard.service';



const routes = [
    {
        path     : 'news',
        component: NewsComponent,
        canActivate: [AuthGuard]
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
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatStepperModule,
        MarkdownModule.forRoot(),
        QuillModule,
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
