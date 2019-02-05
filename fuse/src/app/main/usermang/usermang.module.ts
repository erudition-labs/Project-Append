import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserMangComponent } from './usermang.component';
import { UserFormDialogComponent } from './user-form/user-form.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AuthGuardService as AuthGuard } from '@core/auth/auth-guard.service';



import {
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    MatPaginatorModule,
    MatDividerModule,
    MatToolbarModule,
    MatSortModule,
  } from '@angular/material';



const routes = [
  {
      path     : 'usermang',
      component: UserMangComponent,
      canActivate: [AuthGuard]
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
    MatSortModule,
],
exports     : [
    UserMangComponent
], 
entryComponents: [UserFormDialogComponent]
})
export class UserMangModule { }
