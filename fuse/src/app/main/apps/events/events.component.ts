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
    @Select(CalendarEventState.calendarEvents) $events : Observable<CalendarEventModel[]>

    actions             : CalendarEventAction[];
    activeDayIsOpen     : boolean;
    confirmDialogRef    : MatDialogRef<FuseConfirmDialogComponent>;
    dialogRef           : any;
    events              : CalendarEvent[];
    refresh             : Subject<any> = new Subject();
    selectedDay         : any;
    view                : string;
    viewDate            : Date;

    constructor(
        private _matDialog  : MatDialog,
        private store       : Store,
        private actions$    : Actions
       
    ) {
         // Set the defaults
         this.view = 'month';
         this.viewDate = new Date();
         this.activeDayIsOpen = true;
         this.selectedDay = {date: startOfDay(new Date())};
 
        /* this.actions = [
             {
                 label  : '<i class="material-icons s-16">edit</i>',
                 onClick: ({event}: { event: CalendarEvent }): void => {
                    // this.editEvent('edit', event);
                 }
             },
             {
                 label  : '<i class="material-icons s-16">delete</i>',
                 onClick: ({event}: { event: CalendarEvent }): void => {
                    // this.deleteEvent(event);
                 }
             }
         ];*/ //maybe some day lol
 
    }

    ngOnInit() {
        this.$events.subscribe(e => this.events = e);
        this.refresh.next();
    }

    beforeMonthViewRender({header, body}): void {
        // console.info('beforeMonthViewRender');
        /**
         * Get the selected day
         */
        const _selectedDay = body.find((_day) => {
            return _day.date.getTime() === this.selectedDay.date.getTime();
        });

        if (_selectedDay){
            /**
             * Set selectedday style
             * @type {string}
             */
            _selectedDay.cssClass = 'mat-elevation-z3';
        }

    }

    dayClicked(day: CalendarMonthViewDay): void {
        const date: Date = day.date;
        const events: CalendarEvent[] = day.events;

        if(isSameMonth(date, this.viewDate)){
            if((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0){
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
        this.selectedDay = day;
        this.refresh.next();
    }


}