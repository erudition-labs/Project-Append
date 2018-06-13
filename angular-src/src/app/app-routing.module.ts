import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component'


const routes: Routes = [
	{ path: 'register', loadChildren: './register/register.module#RegisterModule'}
	//{ path: '', homecomponent}
	
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
