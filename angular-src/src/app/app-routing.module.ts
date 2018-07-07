import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { NgxAuthComponent,
	NgxAuthBlockComponent,
	NgxLoginComponent,
	NgxRegisterComponent,
	NgxLogoutComponent,
	NgxRequestPasswordComponent, 
	NgxResetPasswordComponent,
	EmailVerificationComponent } from './@theme/components/auth';


const routes: Routes = [
	{ path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
	{
		path: 'auth',
		component: NgxAuthComponent,
		children: [
			{
				path: '',
				component: NgxLoginComponent,
			},

			{
				path: 'login',
				component: NgxLoginComponent,
			},

			{
				path: 'register',
				component: NgxRegisterComponent,
			},
 
			{
				path: 'logout',
				component: NgxLogoutComponent,
			},

			{
				path: 'verify-email',
				component: EmailVerificationComponent
			},

			{
				path: 'request-password',
				component: NgxRequestPasswordComponent,
			},

			{
				path: 'reset-password',
				component: NgxResetPasswordComponent,
			},
		],
	},
	{ path: '', redirectTo: 'pages', pathMatch: 'full' },
	{ path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
	useHash: true,
};

@NgModule({
	imports: [RouterModule.forRoot(routes, config)],
	exports: [RouterModule],
})
export class AppRoutingModule {
}
