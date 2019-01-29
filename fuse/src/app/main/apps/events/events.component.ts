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
        AddEventSuccess, 
        UpdateEvent,
        UpdateEventSuccess,
        EventRemove,
        EventRemoveSuccess} from './_store/events.actions';
import { CalendarEventState } from './_store/events.state';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { tap, takeUntil } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';
import { TokenAuthService } from '@core/auth/tokenAuth.service';
import { UtilsService } from '@core/utils/utils.service';



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
        private _permissionsService: NgxPermissionsService,
        public _tokenAuthService: TokenAuthService,
        private _utils: UtilsService
       
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
                date  : this.selectedDay.date,
                height: '800px',
                width: '700px',
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
                            .subscribe(() => { 
                                this.refresh.next(true);
                                this._utils.success("Created");
                        });
                        break;
                }
        });
    }
    
    editEvent(action: string, eventId: string): void {
       let index = this.events.findIndex(x => x.meta.event._id === eventId);

       if(index > -1) {
            this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
                panelClass: 'event-form-dialog',
                data      : {
                    event : Object.assign({}, this.events[index].meta.event),
                    action: 'edit'
                },
                height: '700px',
                width: '800px',
            });
       }

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) return;
                
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                console.log(actionType);
                switch(actionType) {
                    case 'save':
                        let event = formData.getRawValue() as Event;
                        event._id = this.events[index].meta.event._id;
                        event.additionalDetails = JSON.stringify(event.additionalDetails);

                        //dispatch update
                        this._store.dispatch(new UpdateEvent({ event: event }));
                        this._actions$.pipe(ofActionDispatched(UpdateEventSuccess))
                            .subscribe(() => { 
                                this.refresh.next(true);
                                this._utils.success("Updated");
                        });
                        break;
                    default: break;
                }
        });
    }

    viewEvent(event: CalendarEvent) {
        this.dialogRef = this._matDialog.open(CalendarEventViewDialogComponent, {
            panelClass: 'event-form-dialog',
            data: event.meta.event,
            height: '780px',
            width: '800px',
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if(!response) return;

                if(response.action === 'edit') {
                    this.editEvent('edit', response.id);
                } else if(response.action === 'delete') {
                    let index = this.events.findIndex(x => x.meta.event._id === response.id);
                    this._store.dispatch(new EventRemove({ event: this.events[index].meta.event }));
                    this._actions$.pipe(ofActionDispatched(EventRemoveSuccess))
                        .subscribe(() => {
                            this.refresh.next(true);
                            this._utils.success("Deleted");
                        });
                }
            });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
        this._permissionsService.removePermission('ADMIN');
    }
}