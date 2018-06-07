import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import { MatButtonModule, MatIconModule, MatRippleModule, MatSidenavModule, MatSlideToggleModule, MatTableModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseFileManagerComponent } from './file-manager.component';
import { FileManagerService } from './file-manager.service';
import { FuseFileManagerFileListComponent } from './file-list/file-list.component';
import { FuseFileManagerMainSidenavComponent } from './sidenavs/main/main.component';
import { FuseFileManagerDetailsSidenavComponent } from './sidenavs/details/details.component';

const routes: Routes = [
    {
        path     : '**',
        component: FuseFileManagerComponent,
        children : [],
        resolve  : {
            files: FileManagerService
        }
    }
];

@NgModule({
    declarations: [
        FuseFileManagerComponent,
        FuseFileManagerFileListComponent,
        FuseFileManagerMainSidenavComponent,
        FuseFileManagerDetailsSidenavComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        CdkTableModule,
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
        MatSlideToggleModule,
        MatSidenavModule,
        MatTableModule,

        FuseSharedModule
    ],
    providers   : [
        FileManagerService
    ]
})
export class FuseFileManagerModule
{
}
