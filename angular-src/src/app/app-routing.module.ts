import { NgModule 						} from '@angular/core';
import { RouterModule, Routes 			} from '@angular/router';
import { RegisterComponent 				} from './shared/register/register.component';
import { LoginComponent 				} from './shared/login/login.component';
import { VerifyEmailComponent 			} from './shared/verify-email/verify-email.component';
import { ResendVerifyEmailComponent 	} from './shared/resend-verify-email/resend-verify-email.component';


const routes: Routes = [
	{ path: 'register', 			loadChildren: './shared/register/register.module#RegisterModule'},
	{ path: 'login', 				loadChildren: './shared/login/login.module#LoginModule'},
	{ path: 'verify-email', 		loadChildren: './shared/verify-email/verify-email.module#VerifyEmailModule'},
	{ path: 'resend-verify-email', 	loadChildren: './shared/resend-verify-email/resend-verify-email.module#ResendVerifyEmailModule'}
	//{ path: '', homecomponent}
	
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
