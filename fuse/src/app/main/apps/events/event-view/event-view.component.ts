import { Component, Inject, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalendarEvent, Event } from 'app/main/apps/events/_store/events.state.model';
import { UtilsService } from '@core/utils/utils.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { TokenAuthService } from '@core/auth/tokenAuth.service';
import { EventService } from '../events.service';
import { Store, Actions, ofActionDispatched } from '@ngxs/store';
import { EventRequestRegister, EventRequestRegisterSuccess, EventAcceptRegisterRequest, EventAcceptRegisterRequestSuccess, EventRemoveSignUpOrPending, EventRemoveSignUpOrPendingSuccess, LoadEventsSuccess } from '../_store/events.actions';
import { CalendarEventState } from '../_store/events.state';
import { User } from '@core/user/user.model';

@Component({
    selector     : 'calendar-event-view-dialog',
    templateUrl  : './event-view.component.html',
    styleUrls    : ['./event-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CalendarEventViewDialogComponent implements OnInit, OnDestroy {
    dialogTitle: string;
    constructor(
        public matDialogRef: MatDialogRef<CalendarEventViewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public _data: Event,
        public  _utils: UtilsService,
        private _permissionsService: NgxPermissionsService,
        private _tokenAuthService: TokenAuthService,
        private _eventService: EventService,
        private _store: Store,
        private _actions$: Actions
    ) {}

    ngOnInit() {

        this._data = this.prepEventForView(this._data); 
        this.loadPermissions();  
        this._actions$.pipe(ofActionDispatched(LoadEventsSuccess)).subscribe(() => this.refreshData());
    }

    private refreshData() : void {
        this._store.select(CalendarEventState.calendarEvents).subscribe(e => {
            let index = e.findIndex(x => x.meta.event._id === this._data._id);

            if(index > -1) {
                let event = e[index].meta.event;
                this._data = this.prepEventForView(event);
                this.loadPermissions();
            }
        });

    }

    private prepEventForView(event : Event) : Event {
        event.date[0] = new Date(event.date[0]);
        event.date[1] = new Date(event.date[1]);

        if (event.additionalDetails && typeof event.additionalDetails !== "object") {
            event.additionalDetails = JSON.parse(event.additionalDetails);
        }
        this.dialogTitle = event.name; 

        return event;
    }


    loadPermissions() : void {
        this._permissionsService.flushPermissions();
        this._permissionsService.addPermission('EDIT', () => {
            return ((this._tokenAuthService.isAuthenticated() && this._tokenAuthService.isAdmin()) ||
                    (this._tokenAuthService.isAuthenticated() && this._eventService.isOIC(this._data)));
        });

        this._permissionsService.addPermission('SIGNUP', () => {
            return (this._tokenAuthService.isAuthenticated() && 
                    !this._eventService.isSignedUp(this._data) &&
                    !this._eventService.isPending(this._data)) &&
                    !this._eventService.isClosed(this._data);
        });

        this._permissionsService.addPermission('UNREGISTER', () => {
            return (this._tokenAuthService.isAuthenticated() && 
                    this._eventService.isSignedUp(this._data));
        });

        this._permissionsService.addPermission('PENDING', () => {
            return (this._tokenAuthService.isAuthenticated() && 
                    this._eventService.isPending(this._data));
        });
   }

    eventRequestSignup() : void {
        this._store.dispatch(new EventRequestRegister(Object.assign({}, this._data)));
        this._actions$.pipe(ofActionDispatched(EventRequestRegisterSuccess))
            .subscribe(() => {
                this.refresh();
                this._utils.success("Request Pending");
            });
    }
    eventUnregister() : void {
        this.remove(this._tokenAuthService.getCurrUserId());
    }

    remove(id: string) : void {
        this._store.dispatch(new EventRemoveSignUpOrPending({ event: Object.assign({}, this._data), userId: id }));
        this._actions$.pipe(ofActionDispatched(EventRemoveSignUpOrPendingSuccess))
            .subscribe(() => {
            this.refresh();
            this._utils.success("Unregistered");
        });
    }

    eventAcceptPending(user: User) : void {
        this._store.dispatch(new EventAcceptRegisterRequest({event: Object.assign({}, this._data), userId: user._id}));
        this._actions$.pipe(ofActionDispatched(EventAcceptRegisterRequestSuccess))
            .subscribe(() => this.refresh());
    }

    private refresh() : void {
        //get snapshot, set data equal
        let events = this._store.selectSnapshot(CalendarEventState.calendarEvents);
        let index = events.findIndex(x => x.meta.event._id === this._data._id);
        if(index > -1) {
            this._data = events[index].meta.event;
            this.loadPermissions();
        }
    }

    editEvent() : void {
        this.matDialogRef.close({ action: 'edit', id: this._data._id});
    }

    deleteEvent() : void {
        this.matDialogRef.close({ action: 'delete', id: this._data._id});
    }

    ngOnDestroy() {
        this._permissionsService.removePermission('EDIT');
        this._permissionsService.removePermission('SIGNUP');
        this._permissionsService.removePermission('UNREGISTER');
        this._permissionsService.removePermission('PENDING');
    }

}