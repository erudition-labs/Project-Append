import { Component, Inject, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalendarEvent, Event } from 'app/main/apps/events/_store/events.state.model';
import { UtilsService } from '@core/utils/utils.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { TokenAuthService } from '@core/auth/tokenAuth.service';
import { EventService } from '../events.service';
import { Store, Actions, ofActionDispatched } from '@ngxs/store';
import { EventRequestRegister, EventRequestRegisterFail, EventRequestRegisterSuccess } from '../_store/events.actions';
import { CalendarEventState } from '../_store/events.state';

@Component({
    selector     : 'calendar-event-view-dialog',
    templateUrl  : './event-view.component.html',
    styleUrls    : ['./event-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CalendarEventViewDialogComponent implements OnInit, OnDestroy {
    dialogTitle: string;

    ngOnInit() {}
    constructor(
        public matDialogRef: MatDialogRef<CalendarEventViewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: Event,
        public  _utils: UtilsService,
        private _permissionsService: NgxPermissionsService,
        private _tokenAuthService: TokenAuthService,
        private _eventService: EventService,
        private _store: Store,
        private _actions$: Actions
    ) {
        
        _data.date[0] = new Date(_data.date[0]);
        _data.date[1] = new Date(_data.date[1]);

        if (_data.additionalDetails && typeof _data.additionalDetails !== "object") {
            _data.additionalDetails = JSON.parse(_data.additionalDetails);
        }
        this.dialogTitle = _data.name;        

        this._permissionsService.addPermission('EDIT', () => {
            return ((this._tokenAuthService.isAuthenticated() && this._tokenAuthService.isAdmin()) ||
                    (this._tokenAuthService.isAuthenticated() && this._eventService.isOIC(_data)));
        });

        this._permissionsService.addPermission('SIGNUP', () => {
            return (this._tokenAuthService.isAuthenticated() && 
                    !this._eventService.isSignedUp(_data) &&
                    !this._eventService.isPending(_data));
        });

        this._permissionsService.addPermission('UNREGISTER', () => {
            return (this._tokenAuthService.isAuthenticated() && 
                    this._eventService.isSignedUp(_data));
        });

        this._permissionsService.addPermission('PENDING', () => {
            return (this._tokenAuthService.isAuthenticated() && 
                    this._eventService.isPending(_data));
        });

    }

    eventRequestSignup() : void {
        this._store.dispatch(new EventRequestRegister(Object.assign({}, this._data)));
        this._actions$.pipe(ofActionDispatched(EventRequestRegisterSuccess))
            .subscribe(() => {
                //get snapshot, set data equal
                let events = this._store.selectSnapshot(CalendarEventState.calendarEvents);
                let index = events.findIndex(x => x.meta.event._id === this._data._id);
                if(index > -1) {
                    this._data = events[index].meta.event;
                }
            });
    }
    eventUnregister() : void {
        console.log('unregister');
        
    }

    ngOnDestroy() {
        this._permissionsService.removePermission('EDIT');
        this._permissionsService.removePermission('SIGNUP');
        this._permissionsService.removePermission('UNREGISTER');
        this._permissionsService.removePermission('PENDING');
    }

}