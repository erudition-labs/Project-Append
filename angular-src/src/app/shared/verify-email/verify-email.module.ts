import { NgModule 				} from '@angular/core';
import { CommonModule 			} from '@angular/common';
import { RouterModule, Routes 	} from '@angular/router';
import { AuthService 			} from '../../services/auth.service';
import { VerifyEmailComponent 	} from './verify-email.component';

const routes : Routes = [
	{ path: '', component: VerifyEmailComponent }
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	providers: [
		AuthService
	],
	declarations: [VerifyEmailComponent]
})
export class VerifyEmailModule { }
