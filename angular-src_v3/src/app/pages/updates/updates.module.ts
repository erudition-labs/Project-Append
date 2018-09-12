import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatesRoutingModule, routedComponents } from './updates-routing.module';
import { ThemeModule 								} from '../../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
	  UpdatesRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ]
})
export class UpdatesModule { }
