import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { UserMangComponent } from './usermang.component';

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

    FuseSharedModule
],
exports     : [
    UserMangComponent
]
})
export class UserMangModule { }
