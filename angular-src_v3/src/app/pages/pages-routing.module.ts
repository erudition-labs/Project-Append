import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
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
