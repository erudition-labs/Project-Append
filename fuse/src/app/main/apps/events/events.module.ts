import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSlideToggleModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { ColorPickerModule } from 'ngx-color-picker';
import { CalendarModule as AngularCalendarModule } from 'angular-calendar';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';

import { EventsComponent } from 'app/main/apps/events/events.component';
import { EventService } from 'app/main/apps/events/events.service';
import { CalendarEventFormDialogComponent } from 'app/main/apps/calendar/event-form/event-form.component';
import { NgxsModule } from '@ngxs/store';
import { CalendarEventState } from './_store/events.state';

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
        CalendarEventFormDialogComponent
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatTooltipModule,

        AngularCalendarModule.forRoot(),
        ColorPickerModule,

        FuseSharedModule,
        FuseConfirmDialogModule, 
        NgxsModule.forFeature([CalendarEventState])
    ],
    providers      : [
        EventService
    ],
    entryComponents: [
        CalendarEventFormDialogComponent
    ]
})
export class EventsModule
{
}
