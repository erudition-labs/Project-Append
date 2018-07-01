import { NgModule 				} from '@angular/core';
import { CommonModule 			} from '@angular/common';
import { RouterModule, Routes 	} from '@angular/router';
import { LoginComponent 		} from './login.component';
import { AuthService 			} from '../../services/auth.service';
import { MatInputModule 		} from '@angular/material/input';
import { MatFormFieldModule 	} from '@angular/material/form-field';
import { MatCardModule 			} from '@angular/material/card';
import { MatButtonModule 		} from '@angular/material/button';

const routes : Routes = [
	{ path: '', component: LoginComponent }
];

@NgModule({
	imports: [
		CommonModule,
		MatInputModule,
		MatFormFieldModule,
		MatCardModule,
		MatButtonModule,
		RouterModule.forChild(routes)
	],
	providers: [
		AuthService
	],
	declarations: [LoginComponent]
})
export class LoginModule { }
