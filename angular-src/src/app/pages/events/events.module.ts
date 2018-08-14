import { NgModule 									} from '@angular/core';
import { EventsRoutingModule, routedComponents 		} from './events-routing.module';
import { ThemeModule 								} from '../../@theme/theme.module';
import { CalendarModule 							} from 'angular-calendar';
import { NgbModalModule 							} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { FlatpickrModule 							} from 'angularx-flatpickr';


@NgModule({
  imports: [
	ThemeModule,
	EventsRoutingModule,
	CalendarModule.forRoot(),
	NgbModalModule.forRoot(),
	FlatpickrModule.forRoot(),
  ],
  declarations: [
	...routedComponents,
  ]
})
export class EventsModule { }
