import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserMangComponent } from './usermang.component';
import { UserFormDialogComponent } from './user-form/user-form.component';
import { NgxPermissionsModule } from 'ngx-permissions';


import {
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    MatPaginatorModule,
    MatDividerModule,
    MatToolbarModule
  } from '@angular/material';



const routes = [
  {
      path     : 'usermang',
      component: UserMangComponent
  }
];

@NgModule({
  declarations: [
    UserMangComponent,
    UserFormDialogComponent,
],
imports     : [
    RouterModule.forChild(routes),
    NgxPermissionsModule.forChild({ permissionsIsolate: true }),

    TranslateModule,

    FuseSharedModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatPaginatorModule,
    MatDividerModule,
    MatToolbarModule,
],
exports     : [
    UserMangComponent
], 
entryComponents: [UserFormDialogComponent]
})
export class UserMangModule { }
