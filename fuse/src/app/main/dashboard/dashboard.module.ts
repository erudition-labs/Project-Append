import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { DashboardComponent } from './dashboard.component';
import { MatButtonModule, MatIconModule, MatMenuModule, MatTabsModule, MatListModule } from '@angular/material';
import { AuthGuardService as AuthGuard } from '@core/auth/auth-guard.service';



const routes = [
  {
      path     : 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard]
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
