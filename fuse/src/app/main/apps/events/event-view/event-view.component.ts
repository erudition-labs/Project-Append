import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalendarEvent, Event } from 'app/main/apps/events/_store/events.state.model';
import { UtilsService } from '@core/utils/utils.service';
@Component({
    selector     : 'calendar-event-view-dialog',
    templateUrl  : './event-view.component.html',
    styleUrls    : ['./event-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CalendarEventViewDialogComponent implements OnInit{
    dialogTitle: string;

    ngOnInit() {}
    constructor(
        public matDialogRef: MatDialogRef<CalendarEventViewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: Event,
        public utils: UtilsService
    ) {
        _data.date[0] = new Date(_data.date[0]);
        _data.date[1] = new Date(_data.date[1]);
        _data.additionalDetails = JSON.parse(_data.additionalDetails);
        this.dialogTitle = _data.name;
        console.log(_data);
    }
}