import { NgModule 						} from '@angular/core';
import { CommonModule 					} from '@angular/common';
import { RouterModule, Routes 			} from '@angular/router';
import { ResendVerifyEmailComponent 	} from './resend-verify-email.component';
import { AuthService 					} from '../../services/auth.service';

const routes : Routes = [
	{ path: '', component: ResendVerifyEmailComponent }
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	], 
	providers: [
		AuthService
	],
	declarations: [ResendVerifyEmailComponent]
})
export class ResendVerifyEmailModule { }
