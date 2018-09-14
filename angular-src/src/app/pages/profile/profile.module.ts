import { NgModule 									} from '@angular/core';
import { ProfileRoutingModule, routedComponents 		} from './profile-routing.module';
import { ThemeModule 								} from '../../@theme/theme.module';

@NgModule({
  imports: [
	ThemeModule,
	ProfileRoutingModule,
  ],
  declarations: [
	...routedComponents,
  ]
})
export class ProfileModule { }
