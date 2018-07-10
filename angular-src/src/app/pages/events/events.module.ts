import { NgModule } from '@angular/core';
import { EventsRoutingModule, routedComponents } from './events-routing.module';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
  ThemeModule,
  EventsRoutingModule,

  ],
  declarations: [
  ...routedComponents,
  ]
})
export class EventsModule { }
