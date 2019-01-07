import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, 
    MatDatepickerModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatIconModule, 
    MatInputModule, 
    MatSlideToggleModule,
    MatToolbarModule, 
    MatListModule, 
    MatTooltipModule,
    MatCardModule,
    MatExpansionModule,
    MatBadgeModule,
    MatCheckboxModule,
} from '@angular/material';
import { ColorPickerModule } from 'ngx-color-picker';
import { CalendarModule as AngularCalendarModule } from 'angular-calendar';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';

import { EventsComponent } from 'app/main/apps/events/events.component';
import { EventService } from 'app/main/apps/events/events.service';
import { CalendarEventFormDialogComponent } from 'app/main/apps/events/event-form/event-form.component';
import { CalendarEventViewDialogComponent } from 'app/main/apps/events/event-view/event-view.component';
import { NgxsModule } from '@ngxs/store';
import { CalendarEventState } from './_store/events.state';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPermissionsModule } from 'ngx-permissions';


const routes: Routes = [
    {
        path     : '**',
        component: EventsComponent,
        children : [],
        resolve  : {
           // chat: CalendarService
        }
    }
];

@NgModule({
    declarations   : [
        EventsComponent,
        CalendarEventFormDialogComponent,
        CalendarEventViewDialogComponent
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatListModule,
        MatInputModule,
        MatCardModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatTooltipModule,
        MatCheckboxModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NgSelectModule,
        MatExpansionModule,
        MatBadgeModule,

        AngularCalendarModule.forRoot(),
        ColorPickerModule,
        NgxPermissionsModule.forChild({ permissionsIsolate: true }),

        FuseSharedModule,
        FuseConfirmDialogModule, 
        NgxsModule.forFeature([CalendarEventState])
    ],
    providers      : [
        EventService
    ],
    entryComponents: [
        CalendarEventFormDialogComponent,
        CalendarEventViewDialogComponent
    ]
})
export class EventsModule
{
}
