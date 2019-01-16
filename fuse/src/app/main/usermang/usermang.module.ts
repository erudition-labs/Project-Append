import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserMangComponent } from './usermang.component';

import {
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule
  } from '@angular/material';

const routes = [
  {
      path     : 'usermang',
      component: UserMangComponent
  }
];

@NgModule({
  declarations: [
    UserMangComponent
],
imports     : [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
],
exports     : [
    UserMangComponent
]
})
export class UserMangModule { }
