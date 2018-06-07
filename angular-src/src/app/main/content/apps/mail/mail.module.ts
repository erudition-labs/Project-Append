import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatToolbarModule } from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { MailService } from './mail.service';
import { FuseMailComponent } from './mail.component';
import { FuseMailMainSidenavComponent } from './sidenavs/main/main-sidenav.component';
import { FuseMailListItemComponent } from './mail-list/mail-list-item/mail-list-item.component';
import { FuseMailListComponent } from './mail-list/mail-list.component';
import { FuseMailDetailsComponent } from './mail-details/mail-details.component';
import { FuseMailComposeDialogComponent } from './dialogs/compose/compose.component';

const routes: Routes = [
    {
        path     : 'label/:labelHandle',
        component: FuseMailComponent,
        resolve  : {
            mail: MailService
        }
    },
    {
        path     : 'label/:labelHandle/:mailId',
        component: FuseMailComponent,
        resolve  : {
            mail: MailService
        }
    },
    {
        path     : 'filter/:filterHandle',
        component: FuseMailComponent,
        resolve  : {
            mail: MailService
        }
    },
    {
        path     : 'filter/:filterHandle/:mailId',
        component: FuseMailComponent,
        resolve  : {
            mail: MailService
        }
    },
    {
        path     : ':folderHandle',
        component: FuseMailComponent,
        resolve  : {
            mail: MailService
        }
    },
    {
        path     : ':folderHandle/:mailId',
        component: FuseMailComponent,
        resolve  : {
            mail: MailService
        }
    },
    {
        path      : '**',
        redirectTo: 'inbox'
    }
];

@NgModule({
    declarations   : [
        FuseMailComponent,
        FuseMailListComponent,
        FuseMailListItemComponent,
        FuseMailDetailsComponent,
        FuseMailMainSidenavComponent,
        FuseMailComposeDialogComponent
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatToolbarModule,

        TranslateModule,

        FuseSharedModule
    ],
    providers      : [
        MailService
    ],
    entryComponents: [FuseMailComposeDialogComponent]
})
export class FuseMailModule
{
}
