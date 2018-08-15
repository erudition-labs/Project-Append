import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app/core';
import { ParentComponent } from '../examples/theming/parent/parent.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  {
    path: '',
	//component: LoginComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'anms.examples.menu.todos' }
      },
	  {
	  	path:'events',
		component: EventsComponent,
		pathMatch: 'full'
	  },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
