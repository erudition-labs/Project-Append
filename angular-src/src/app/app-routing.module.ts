import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './shared/register/register.component'


const routes: Routes = [
	{ path: 'register', loadChildren: './shared/register/register.module#RegisterModule'}
	//{ path: '', homecomponent}
	
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
