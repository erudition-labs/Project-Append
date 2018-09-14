import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatesComponent } from './updates.component';

const routes: Routes = [{
  path: '',
  component: UpdatesComponent,

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatesRoutingModule { }

export const routedComponents = [
  UpdatesComponent,
];
