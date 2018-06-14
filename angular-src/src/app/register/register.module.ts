import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { AuthService } from '../services/auth.service';

const routes : Routes = [
	{path: '', component: RegisterComponent}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	providers: [
		AuthService
	],
	declarations: [RegisterComponent]
})
export class RegisterModule { }
