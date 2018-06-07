import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatToolbarModule } from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { MailAppStoreModule } from './store/store.module';
import * as fromGuards from './store/guards/index';

import { FuseMailNgrxComponent } from './mail.component';
import { FuseMailNgrxMainSidenavComponent } from './sidenavs/main/main-sidenav.component';
import { FuseMailNgrxListItemComponent } from './mail-list/mail-list-item/mail-list-item.component';
import { FuseMailNgrxListComponent } from './mail-list/mail-list.component';
import { FuseMailNgrxDetailsComponent } from './mail-details/mail-details.component';
import { MailNgrxService } from './mail.service';
import { FuseMailNgrxComposeDialogComponent } from './dialogs/compose/compose.component';

const routes: Routes = [
    {
        path       : 'label/:labelHandle',
        component  : FuseMailNgrxComponent,
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path       : 'label/:labelHandle/:mailId',
        component  : FuseMailNgrxComponent,
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path     : 'filter/:filterHandle',
        component: FuseMailNgrxComponent,
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path     : 'filter/:filterHandle/:mailId',
        component: FuseMailNgrxComponent,
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path     : ':folderHandle',
        component: FuseMailNgrxComponent,
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path     : ':folderHandle/:mailId',
        component: FuseMailNgrxComponent,
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path      : '**',
        redirectTo: 'inbox'
    }
];

@NgModule({
    declarations   : [
        FuseMailNgrxComponent,
        FuseMailNgrxListComponent,
        FuseMailNgrxListItemComponent,
        FuseMailNgrxDetailsComponent,
        FuseMailNgrxMainSidenavComponent,
        FuseMailNgrxComposeDialogComponent
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

        FuseSharedModule,

        MailAppStoreModule
    ],
    providers      : [
        MailNgrxService,
        fromGuards.ResolveGuard
    ],
    entryComponents: [FuseMailNgrxComposeDialogComponent]
})
export class FuseMailNgrxModule
{
}
