import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

const routes : Routes = [
	{ path: '', component: LoginComponent}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	providers: [
		AuthService
	],
	declarations: [LoginComponent]
})
export class LoginModule { }
