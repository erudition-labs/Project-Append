import { Component, Inject, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalendarEvent, Event } from 'app/main/apps/events/_store/events.state.model';
import { UtilsService } from '@core/utils/utils.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from '@core/auth/auth.service';
import { EventService } from '../events.service';

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
        @Inject(MAT_DIALOG_DATA) private _data  : Event,
        public utils                            : UtilsService,
        private permissionsService              : NgxPermissionsService,
        private authService                     : AuthService,
        private eventService                    : EventService
    ) {
        _data.date[0] = new Date(_data.date[0]);
        _data.date[1] = new Date(_data.date[1]);

        if (_data.additionalDetails && typeof _data.additionalDetails !== "object") {
            _data.additionalDetails = JSON.parse(_data.additionalDetails);
        }
        this.dialogTitle = _data.name;
/*
        this.permissionsService.addPermission('EDIT', () => {
            return ((this.authService.isAuthenticated() && this.authService.isAdmin()) ||
                    (this.authService.isAuthenticated() && this.eventService.isOIC(_data)));
        });

        this.permissionsService.addPermission('SIGNUP', () => {
            return (this.authService.isAuthenticated() && 
                    !this.eventService.isSignedUp(_data) &&
                    !this.eventService.isPending(_data));
        });

        this.permissionsService.addPermission('UNREGISTER', () => {
            return (this.authService.isAuthenticated() && 
                    this.eventService.isSignedUp(_data));
        });

        this.permissionsService.addPermission('PENDING', () => {
            return (this.authService.isAuthenticated() && 
                    this.eventService.isPending(_data));
        });
*/
    }

    eventRequestSignup() : void {
        console.log('signup');
    }
    eventUnregister() : void {
        console.log('unregister');
        
    }

    ngOnDestroy() {
        this.permissionsService.removePermission('EDIT');
        this.permissionsService.removePermission('SIGNUP');
        this.permissionsService.removePermission('UNREGISTER');
        this.permissionsService.removePermission('PENDING');
    }

}