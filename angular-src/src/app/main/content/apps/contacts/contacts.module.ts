import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatSidenavModule, MatTableModule, MatToolbarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';

import { FuseContactsMainSidenavComponent } from './sidenavs/main/main.component';
import { FuseContactsComponent } from './contacts.component';
import { ContactsService } from './contacts.service';
import { FuseContactsContactListComponent } from './contact-list/contact-list.component';
import { FuseContactsSelectedBarComponent } from './selected-bar/selected-bar.component';
import { FuseContactsContactFormDialogComponent } from './contact-form/contact-form.component';

const routes: Routes = [
    {
        path     : '**',
        component: FuseContactsComponent,
        resolve  : {
            contacts: ContactsService
        }
    }
];

@NgModule({
    declarations   : [
        FuseContactsComponent,
        FuseContactsContactListComponent,
        FuseContactsSelectedBarComponent,
        FuseContactsMainSidenavComponent,
        FuseContactsContactFormDialogComponent
    ],
    imports        : [
        RouterModule.forChild(routes),
        CdkTableModule,

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSidenavModule,
        MatTableModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseConfirmDialogModule
    ],
    providers      : [
        ContactsService
    ],
    entryComponents: [FuseContactsContactFormDialogComponent]
})
export class FuseContactsModule
{
}
