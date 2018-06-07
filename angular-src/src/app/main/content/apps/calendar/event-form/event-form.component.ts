import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { MatColors } from '@fuse/mat-colors';

import { CalendarEvent } from 'angular-calendar';
import { CalendarEventModel } from '../event.model';

@Component({
    selector     : 'fuse-calendar-event-form-dialog',
    templateUrl  : './event-form.component.html',
    styleUrls    : ['./event-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FuseCalendarEventFormDialogComponent
{
    event: CalendarEvent;
    dialogTitle: string;
    eventForm: FormGroup;
    action: string;
    presetColors = MatColors.presets;

    constructor(
        public dialogRef: MatDialogRef<FuseCalendarEventFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder
    )
    {
        this.event = data.event;
        this.action = data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = this.event.title;
        }
        else
        {
            this.dialogTitle = 'New Event';
            this.event = new CalendarEventModel({
                start: data.date,
                end  : data.date
            });
        }

        this.eventForm = this.createEventForm();
    }

    createEventForm()
    {
        return new FormGroup({
            title : new FormControl(this.event.title),
            start : new FormControl(this.event.start),
            end   : new FormControl(this.event.end),
            allDay: new FormControl(this.event.allDay),
            color : this.formBuilder.group({
                primary  : new FormControl(this.event.color.primary),
                secondary: new FormControl(this.event.color.secondary)
            }),
            meta  :
                this.formBuilder.group({
                    location: new FormControl(this.event.meta.location),
                    notes   : new FormControl(this.event.meta.notes)
                })
        });
    }
}
