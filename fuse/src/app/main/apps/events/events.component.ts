import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subject, Observable } from 'rxjs';
import { startOfDay, isSameDay, isSameMonth } from 'date-fns';
import { CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay } from 'angular-calendar';
import { CalendarEvent  as AngularCalendarEvent } from 'angular-calendar';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { fuseAnimations } from '@fuse/animations';

import { CalendarEventModel, Event, CalendarEvent } from 'app/main/apps/events/_store/events.state.model';
import { CalendarEventFormDialogComponent } from 'app/main/apps/events/event-form/event-form.component';
import { CalendarEventViewDialogComponent } from 'app/main/apps/events/event-view/event-view.component';
import { CalendarEventActions, 
        AddEvent, 
        AddEventSuccess } from './_store/events.actions';
import { CalendarEventState } from './_store/events.state';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { tap, takeUntil } from 'rxjs/operators';

@Component({
    selector     : 'events',
    templateUrl  : './events.component.html',
    styleUrls    : ['./events.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class EventsComponent implements OnInit, OnDestroy {
    @Select(CalendarEventState.calendarEvents) events$ : Observable<CalendarEventModel[]>

    actions             : CalendarEventAction[];
    activeDayIsOpen     : boolean;
    confirmDialogRef    : MatDialogRef<FuseConfirmDialogComponent>;
    dialogRef           : any;
    events              : CalendarEvent[];
    refresh             : Subject<any> = new Subject();
    selectedDay         : any;
    view                : string;
    viewDate            : Date;
    private ngUnsubscribe = new Subject();

    constructor(
        private _matDialog  : MatDialog,
        private _store      : Store,
        private _actions$   : Actions,
       
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
        this._actions$.pipe(takeUntil(this.ngUnsubscribe));
        this.events$.pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(e => this.events = e);
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
        const events: AngularCalendarEvent[] = day.events;

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

    addEvent(): void {
        this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
            panelClass: 'event-form-dialog',
            data      : {
                action: 'new',
                date  : this.selectedDay.date
            }
        });
        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if(!response) return;
        
                const actionType: string = response[0];
                const formData: FormGroup = response[1];

                switch(actionType) {
                    case 'new':
                        let event = new CalendarEvent(formData.getRawValue() as Event, {actions: this.actions});
                        event.meta.event.additionalDetails = JSON.stringify(event.meta.event.additionalDetails);
                        this._store.dispatch(new AddEvent(event));
                        this._actions$.pipe(ofActionDispatched(AddEventSuccess))
                            .subscribe(() => { this.refresh.next(true);
                        });
                        break;
                }
        });
    }
    
    editEvent(action: string, event: CalendarEvent): void {
        const eventIndex = this.events.indexOf(event);

        this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
            panelClass: 'event-form-dialog',
            data      : {
                event : event.meta.event,
                action: action
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) return;
                
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch(actionType) {
                    case 'save':
                        this.events[eventIndex] = Object.assign(this.events[eventIndex], formData.getRawValue());
                        this.refresh.next(true);
                        break;

                    case 'delete':
                       // this.deleteEvent(event);

                        break;
                }
        });
    }

    viewEvent(event: CalendarEvent) {
        this.dialogRef = this._matDialog.open(CalendarEventViewDialogComponent, {
            panelClass: 'event-form-dialog',
            data: event.meta.event
        });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}