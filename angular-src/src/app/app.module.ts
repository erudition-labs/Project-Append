/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF 				} from '@angular/common';
import { BrowserModule 				} from '@angular/platform-browser';
import { BrowserAnimationsModule 	} from '@angular/platform-browser/animations';
import { NgModule 					} from '@angular/core';
import { HttpClientModule 			} from '@angular/common/http';
import { CoreModule 				} from './@core/core.module';

import { AppComponent 			} from './app.component';
import { AppRoutingModule 		} from './app-routing.module';
import { ThemeModule 			} from './@theme/theme.module';
import { NgbModule 				} from '@ng-bootstrap/ng-bootstrap';
import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';
import { NbAuthJWTToken } from '@nebular/auth';

const formSettings : any = {
	redirectDelay: 500,  // delay before redirect after a successful login, while success message is shown 
	strategy: 'email',  // strategy id key
	rememberMe: false, // whether to show or not the `rememberMe` checkbox
	showMessages: { // show/not show success/error messages
		success: true,
		error: true,
	},
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
	NbAuthModule.forRoot({
		strategies: [
			NbPasswordAuthStrategy.setup({
				name: 'email',
				token: { class: NbAuthJWTToken, },
				baseEndpoint: 'http://localhost:3000/api/v1',
				login: {
					endpoint: '/auth/authenticate',
					method: 'post',
				},

				register: {
					endpoint: '/auth/register',
					method: 'post',
				},
			}),
		],
		forms: {
			login 		: formSettings,
			register	: formSettings,	
		},
	}), 
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
