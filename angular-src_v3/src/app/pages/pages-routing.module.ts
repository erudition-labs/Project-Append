import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';



const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
	{
		path:'events',
		loadChildren: './events/events.module#EventsModule',
	},
  {
		path:'user-management',
		loadChildren: './user-management/user-management.module#UserManagementModule',
	},
	{
		path:'profile',
		loadChildren: './profile/profile.module#ProfileModule',
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
