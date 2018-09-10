import 'flatpickr/dist/flatpickr.css';
import { NgModule 									} from '@angular/core';
import { EventsRoutingModule, routedComponents 		} from './events-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ThemeModule 								} from '../../@theme/theme.module';
import { CalendarModule 							} from 'angular-calendar';
import { NgbModalModule 							} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { FlatpickrModule 							} from 'angularx-flatpickr';
import { SharedModule } from '../../shared/shared.module';
import { DialogOverviewEventComponent } from './events.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  imports: [
  CommonModule,
	ThemeModule,
	EventsRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	SharedModule,
	OwlDateTimeModule,
	OwlNativeDateTimeModule,
	CalendarModule.forRoot(),
	NgbModalModule.forRoot(),
	FlatpickrModule.forRoot(),
  ],
  declarations: [
	...routedComponents,
	DialogOverviewEventComponent,
  ],
  entryComponents: [DialogOverviewEventComponent]
})
export class EventsModule { }
