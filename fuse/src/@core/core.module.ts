import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { TokenInterceptorService as TokenInterceptor } from './utils/token-interceptor.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { HttpErrorHandler } from './utils/http-error-handler.service';
import { ErrorService } from './utils/error.service';
import { TokenAuthService } from './auth/tokenAuth.service';




export const CORE_PROVIDERS = [
    AuthService,
    UserService,
    AuthGuardService,
    HttpErrorHandler,
    ErrorService,
    TokenAuthService,
  {
  	provide: HTTP_INTERCEPTORS,
	useClass: TokenInterceptor,
	multi: true
  },
];



@NgModule({
    imports: [
      CommonModule,
    ],
    exports: [
    ],
    declarations: [],
  })

export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
      throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
  
    static forRoot(): ModuleWithProviders {
      return <ModuleWithProviders>{
        ngModule: CoreModule,
        providers: [
          ...CORE_PROVIDERS,
        ],
      };
    }
  }
  