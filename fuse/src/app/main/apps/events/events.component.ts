import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subject, Observable } from 'rxjs';
import { startOfDay, isSameDay, isSameMonth } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay } from 'angular-calendar';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { fuseAnimations } from '@fuse/animations';

import { CalendarEventModel, Event } from 'app/main/apps/events/_store/events.state.model';
import { CalendarEventFormDialogComponent } from 'app/main/apps/calendar/event-form/event-form.component';
import { CalendarEventActions } from './_store/events.actions';
import { CalendarEventState } from './_store/events.state';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';

@Component({
    selector     : 'events',
    templateUrl  : './events.component.html',
    styleUrls    : ['./events.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class EventsComponent implements OnInit {
    @Select(CalendarEventState.calendarEvents)
    $events : Observable<CalendarEventModel[]>

    constructor(
        private _matDialog: MatDialog,
        private store: Store,
        private actions$: Actions
       
    ) {}

    ngOnInit() {
       /* this.$events = this.store.select(CalendarEventState.calendarEvents).pipe(
            tap((event: CalendarEventModel) => { console.log(event)})
        );*/
        this.$events.subscribe(e =>  console.log(e));
        //console.log(this.$events);
    }


}