import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuardService } from './../@core/auth/auth-guard.service';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuardService],
    },
	{
		path:'events',
    loadChildren: './events/events.module#EventsModule',
    canActivate: [AuthGuardService],
	},
  {
		path:'user-management',
    loadChildren: './user-management/user-management.module#UserManagementModule',
    canActivate: [AuthGuardService],
  },
  {
		path:'updates',
    loadChildren: './updates/updates.module#UpdatesModule',
    canActivate: [AuthGuardService],
	},
	{
		path:'profile',
    loadChildren: './profile/profile.module#ProfileModule',
    canActivate: [AuthGuardService],
	},
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
{
    path: '**',
    component: NotFoundComponent,
  }

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
