import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSlideToggleModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { ColorPickerModule } from 'ngx-color-picker';
import { CalendarModule as AngularCalendarModule } from 'angular-calendar';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';

import { CalendarComponent } from 'app/main/apps/calendar/calendar.component';
import { CalendarService } from 'app/main/apps/calendar/calendar.service';
import { CalendarEventFormDialogComponent } from 'app/main/apps/calendar/event-form/event-form.component';

const routes: Routes = [
    {
        path     : '**',
        component: CalendarComponent,
        children : [],
        resolve  : {
            chat: CalendarService
        }
    }
];

@NgModule({
    declarations   : [
        CalendarComponent,
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
        FuseConfirmDialogModule
    ],
    providers      : [
        CalendarService
    ],
    entryComponents: [
        CalendarEventFormDialogComponent
    ]
})
export class CalendarModule
{
}
