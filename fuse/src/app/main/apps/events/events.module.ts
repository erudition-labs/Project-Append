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

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';

import { EventsComponent } from 'app/main/apps/events/events.component';
import { EventService } from 'app/main/apps/events/events.service';
import { CalendarEventFormDialogComponent } from 'app/main/apps/events/event-form/event-form.component';
import { CalendarEventViewDialogComponent } from 'app/main/apps/events/event-view/event-view.component';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxsModule } from '@ngxs/store';
import { CalendarEventState } from './_store/events.state';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AuthGuardService as AuthGuard } from '@core/auth/auth-guard.service';


const routes: Routes = [
    {
        path     : '**',
        component: EventsComponent,
        canActivate: [AuthGuard]
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

        AngularCalendarModule.forRoot({
            provide   : DateAdapter,
            useFactory: adapterFactory
        }),
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
