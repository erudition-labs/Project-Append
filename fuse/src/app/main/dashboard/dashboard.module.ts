import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { DashboardComponent } from './dashboard.component';
import { MatButtonModule, MatIconModule, MatMenuModule, MatTabsModule, MatListModule } from '@angular/material';


const routes = [
  {
      path     : 'dashboard',
      component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent
],
imports     : [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatListModule
],
exports     : [
    DashboardComponent
]
})
export class DashboardModule { }
