import { Component, Inject, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
//import { CalendarEvent } from 'angular-calendar';

import { MatColors } from '@fuse/mat-colors';
import { Store, Select } from '@ngxs/store';
import { User } from '@core/user/user.model';


import { CalendarEvent, Event } from 'app/main/apps/events/_store/events.state.model';
import { TokenAuthService } from '@core/auth/tokenAuth.service';
import { AuthState } from '@core/store/auth/auth.state';
import { UsersState } from '@core/store/users/user.state';
import { Subject, Observable } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { LoadUsers } from '@core/store/users/users.actions';



@Component({
    selector     : 'calendar-event-form-dialog',
    templateUrl  : './event-form.component.html',
    styleUrls    : ['./event-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CalendarEventFormDialogComponent implements OnDestroy, OnInit
{
    @Select(UsersState.allUsers) users$ : Observable<User[]>
    action: string;
    event: Event;
    eventForm: FormGroup;
    dialogTitle: string;
    noShowOptions: boolean = true;
    private ngUnsubscribe = new Subject();


    constructor(
        public matDialogRef: MatDialogRef<CalendarEventFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public _data: any,
        private _formBuilder: FormBuilder,
        private _tokenAuthService: TokenAuthService,
        private _store: Store
    ) {
        this.event = _data.event;
        this.action = _data.action;

        if(this.action === 'edit') {
            this.dialogTitle = this.event.name;
            this.noShowOptions = this.event.isClosed;

        } else {
            this.dialogTitle = 'New Event';
            this.event = {} as Event;
        }

        this.eventForm = this.createEventForm();
        this.removeDetailField(0);
    }

    ngOnInit() : void {
        this.users$.pipe(takeUntil(this.ngUnsubscribe));
    }

    createEventForm(): FormGroup {

       let form = this._formBuilder.group({
			name					: new FormControl(this.event.name                   || '', 		{ validators: [Validators.required] }),
			isVerificationRequired 	: new FormControl(this.event.isVerificationRequired || 'true', 	{ validators: [Validators.required] }),
			isVerified				: new FormControl(this.event.isVerified             || 'false', { validators: [Validators.required] }),
			isClosed				: new FormControl(this.event.isClosed               || 'false', { validators: [Validators.required] }),
			date					: new FormControl(this.event.date                   || [], 		{ validators: [Validators.required] }),
			summary					: new FormControl(this.event.summary                || '',      { }),
			OIC						: new FormControl(this.event.OIC                    || [],      { }),
			signedUp				: new FormControl(this.event.signedUp               || [],      { }),
			pending					: new FormControl(this.event.pending                || [],      { }),
			author					: new FormControl(this._tokenAuthService.getCurrUserId() || '',      { }),
			spots					: new FormControl(this.event.spots                  || 0,      { validators: [this.validateNumber.bind(this), Validators.required] }),
            additionalDetails		: this._formBuilder.array([ this.initDetailField() ]),
            isDeleted               : new FormControl(this.event.isDeleted              || false)
        });

        
        if(this._data.event && this._data.event.additionalDetails) {
            if (this._data.event.additionalDetails && typeof this._data.event.additionalDetails !== "object") {
                this._data.event.additionalDetails = JSON.parse(this._data.event.additionalDetails);
            }

            let details = this._data.event.additionalDetails;
            details.forEach(function(obj) {  //populate formArray
                const control = <FormArray> form.controls['additionalDetails'];
                control.push(this.initDetailFieldWithData(obj.title, obj.details));
            }.bind(this));
        }

        return form;
        
    }
    validateNumber(control: FormControl): { [s: string]: boolean } {
		//if (control.value === null) return null;
  		if (isNaN(control.value)) return { 'NaN': true };
		return null; 
    }
    
    initDetailField() : FormGroup {
		return this._formBuilder.group({
			title	: [''],
			details	: ['']
		});
    }
    
    addDetailField() : void {
		const control = <FormArray>this.eventForm.controls['additionalDetails'];
		control.push(this.initDetailField());
    }
    
    removeDetailField(i: number) : void {
		const control = <FormArray>this.eventForm.controls['additionalDetails'];
		control.removeAt(i);
    }

    private initDetailFieldWithData(_title: string, _details: string) : FormGroup {
		return this._formBuilder.group({
			title	: [_title],
			details	: [_details]
		});
    }
    
    toggleOptions($event, opt) : void {
        if(opt === 'signups') {
            this.noShowOptions = $event.checked;
        }
        
        if(opt === 'limit' && $event.checked) {
            this.eventForm.get('spots').setValue(-1);
            this.eventForm.get('spots').disable();
            this.eventForm.get('isClosed').setValue(false);
        } else {
            this.eventForm.get('spots').setValue(0);
            this.eventForm.get('spots').enable();
        }
    }

    checkDates() : void {
        if(!this.eventForm.get('date').value[0]) this.eventForm.get('date').value[0] = this.eventForm.get('date').value[1];
        if(!this.eventForm.get('date').value[1]) this.eventForm.get('date').value[1] = this.eventForm.get('date').value[0];
        if(!this.eventForm.get('date').value[0] && !this.eventForm.get('date').value[1]){
            this.eventForm.get('date').value[0] = new Date();
            this.eventForm.get('date').value[0] = new Date();
        }

    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
