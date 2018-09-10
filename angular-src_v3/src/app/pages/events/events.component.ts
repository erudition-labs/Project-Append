import { 
	Component, 
	ChangeDetectionStrategy,
	ViewChild,
	TemplateRef,
	OnInit,
	Inject
} from '@angular/core';

import {
	FormGroup,
	FormArray,
	FormBuilder,
	FormControl,
	Validators
} from '@angular/forms';


import {
	startOfDay,
	endOfDay,
	subDays,
	addDays,
	endOfMonth,
	isSameDay,
	isSameMonth,
	addHours
} from 'date-fns';

import { Subject, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';

import {
	CalendarEvent,
	CalendarEventAction,
	CalendarEventTimesChangedEvent
} from 'angular-calendar';

import { 
	MatDialog, 
	MatDialogRef, 
	MAT_DIALOG_DATA 
} from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


import { Event } from '../../@core/events/event.model';
import { User } from '../../@core/user/user.model';
import { EventsService } from '../../@core/events/events.service';
import { UserService } from '../../@core/user/user.service';


const colors: any = {
	red: {
		primary: '#ad2121',
		secondary: '#FAE3E3'
	},
	blue: {
		primary: '#1e90ff',
		secondary: '#D1E8FF'
	},
	yellow: {
		primary: '#e3bc08',
		secondary: '#FDF1BA'
	}
};

@Component({
	selector: 'events',
    changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
	@ViewChild('modalContent') modalContent: TemplateRef<any>;

	private view: string = 'month';
	private viewDate: Date = new Date();

	modalData: {
		action: string;
		event: CalendarEvent;
	}

	private actions: CalendarEventAction[] = [
	{
		label: '<i class="fa fa-fw fa-pencil"></i>',
		onClick: ({ event }: { event: CalendarEvent }): void => {
			this.handleEvent('Edited', event);
		}
	},
	{
		label: '<i class="fa fa-fw fa-times"></i>',
		onClick: ({ event }: { event: CalendarEvent }): void => {
			this.events = this.events.filter(iEvent => iEvent !== event);
			this.handleEvent('Deleted', event);
		}
	}];

	private refresh: Subject<any> = new Subject();
	private events: CalendarEvent[] = [];
	private activeDayIsOpen: boolean = true;
	private newEventForm : FormGroup;

	constructor(private modal			: NgbModal,
				private dialog			: MatDialog,
				private formBuilder 	: FormBuilder,
				private eventsService	: EventsService) { }

	ngOnInit() {
		this.eventsService.getEvents().subscribe((result) => {
			for(let e of result.result) {
				//create calendar event
				const calendarEvent : CalendarEvent = {
					start		: new Date(e.startDate),
					end			: new Date(e.endDate),
					title		: e.name,
					color		: colors.red,
					actions		: this.actions,
					draggable	: true,
					meta		: e, //append our event object to it
				};
				calendarEvent.meta.additionalDetails = JSON.parse(calendarEvent.meta.additionalDetails);
				this.events.push(calendarEvent); //put it on the calendar
			}
			this.refresh.next();
		});			
	}

	dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
		if (isSameMonth(date, this.viewDate)) {
			if (
				(isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
				events.length === 0
			) {
				this.activeDayIsOpen = false;
			} else {
				this.activeDayIsOpen = true;
				this.viewDate = date;
			}
		}
	}

	eventTimesChanged({
		event,
		newStart,
		newEnd
	}: CalendarEventTimesChangedEvent): void {
		event.start = newStart;
		event.end = newEnd;
		//this.handleEvent('Dropped or resized', event);
		this.refresh.next();
	}

	handleEvent(action: string, event: CalendarEvent): void {
		this.modalData = { event, action };
		this.modal.open(this.modalContent, { size: 'lg' });
	}

	addEvent(): void {
		this.events.push({
			title: 'New event',
			start: startOfDay(new Date()),
			end: endOfDay(new Date()),
			color: colors.red,
			draggable: true,
			resizable: {
				beforeStart: true,
				afterEnd: true
			}
		});
		this.refresh.next();
	}

	private createForm(): void {
		this.newEventForm = this.formBuilder.group({
			name					: new FormControl('', 		{ validators: [Validators.required] }),
			isVerificationRequired 	: new FormControl('true', 	{ validators: [Validators.required] }),
			isVerified				: new FormControl('false', 	{ validators: [Validators.required] }),
			isSignupRequired		: new FormControl('true', 	{ validators: [Validators.required] }),
			startDate				: new FormControl('', { }),
			endDate					: new FormControl('', { }),
			OIC						: new FormControl([], { }),
			signedUp				: new FormControl([], { }),
			additionalDetails		: this.formBuilder.array([ this.initDetailField() ])
		});
	}

	private populateFormFromModal() : void {
		this.createForm();

		//remove empty dynamic form
		const dynamicControl = <FormArray>this.newEventForm.controls['additionalDetails'];
		dynamicControl.removeAt(0);

		//get data from currently opened modal
		let data = this.modalData.event.meta;

		//populate formControls
		this.newEventForm.get('name').setValue(data.name);
		this.newEventForm.get('isVerificationRequired').setValue(data.isVerificationRequired);
		this.newEventForm.get('isVerified').setValue(data.isVerified);
		this.newEventForm.get('isSignupRequired').setValue(data.isSignupRequired);
		this.newEventForm.get('startDate').setValue(data.startDate);
		this.newEventForm.get('endDate').setValue(data.endDate);
		this.newEventForm.get('OIC').setValue(data.OIC);
		this.newEventForm.get('signedUp').setValue(data.signedUp);
		
		let details = JSON.parse(data.additionalDetails);
		details.forEach(function(obj) {  //populate formArray
			const control = <FormArray> this.newEventForm.controls['additionalDetails'];
			control.push(this.initDetailFieldWithData(obj.title, obj.details));
		}.bind(this));
		
	}

	private initDetailFieldWithData(_title:string, _details:string) : FormGroup {
		return this.formBuilder.group({
			title	: [_title],
			details	: [_details]
		});
	}

	public initDetailField() : FormGroup {
		return this.formBuilder.group({
			title	: [''],
			details	: ['']
		});
	}

	private dialogDataToEvent(result : any) : Event {
		const {
				name,
				isVerificationRequired,
				isVerified,
				isSignupRequired,
				startDate,
				endDate,
				OIC,
				signedUp,
				additionalDetails
			} = result.value;

		const newEvent : Event = {
			name,
			isVerificationRequired,
			isVerified,
			isSignupRequired,
			startDate,
			endDate,
			OIC,
			signedUp,
			additionalDetails
		};	
		newEvent.additionalDetails = JSON.stringify(result.get('additionalDetails').getRawValue());
		return newEvent;
	}

	public openCreateDialog(): void {
		this.createForm();
		const dialogRef = this.dialog.open(DialogOverviewEventComponent, {
			data: this.newEventForm 
		});

		dialogRef.afterClosed().subscribe(result => {
			if(typeof result === 'undefined' || result == null) { return; }
			if(result.valid) {
				let newEvent = this.dialogDataToEvent(result);

				this.eventsService.createEvent(newEvent).subscribe(
					httpResult => {
						if(httpResult.success) {
							console.log('success');

							this.events.push({
								title	: newEvent.name,
								start	: newEvent.startDate,
								end		: newEvent.endDate,
								color	: colors.red,
								meta	: newEvent
							});
							this.refresh.next();
						} else {
							console.log('nope ' + httpResult);
						}
					}, error => {
						console.log(error);	
					});
			}
		});
	}

	public openUpdateDialog(): void {
		this.populateFormFromModal();
		let dialogRef = this.dialog.open(DialogOverviewEventComponent, {
			data : this.newEventForm
		});

		dialogRef.afterClosed().subscribe(result => {
			if(typeof result === 'undefined' || result == null) { return; }
			if(result.valid) {
				let newEvent = this.dialogDataToEvent(result);
				//be sure to attatch the id of the event since we are editing
				newEvent._id = this.modalData.event.meta._id; 

				this.eventsService.updateEvent(newEvent).subscribe(
					httpResult => {
						if(httpResult.success) {
						console.log(httpResult);
							
						let index = this.events.findIndex(x => x.meta._id === newEvent._id);
						let updatedCalendarEvent : CalendarEvent = {
							title	: newEvent.name,
							start	: new Date(newEvent.startDate),
							end		: new Date(newEvent.endDate),
							color	: colors.red,
							meta	: newEvent
						};

						this.events[index] = updatedCalendarEvent;
							this.refresh.next();
						} else {
							console.log('nope again' + httpResult);
						}
					}, error => {
						console.log(error);
					});
			}
		});

	}
}


@Component({
	providers: [EventsComponent],
	selector: 'dialog-overview-create-event',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: 'dialog-overview-create-event.html',
	styleUrls: ['./dialog-overview-create-event.scss']
})
export class DialogOverviewEventComponent implements OnInit {		

	users : Observable<User[]>;
	selectedUsers = [];

	constructor( 
		public dialogRef: MatDialogRef<DialogOverviewEventComponent>,
			@Inject(MAT_DIALOG_DATA) public data: any,
			private formBuilder 	: FormBuilder,
			private userService 	: UserService,
			private eventsComponent	: EventsComponent) {}

	ngOnInit() {
		this.users = this.userService.getUsers();
	}
			
	private datePickerEvent(type: string, date: MatDatepickerInputEvent<Date>) : void {
		if(type === 'startDate') this.data.controls.startDate.setValue(date.value);
		if(type === 'endDate') this.data.controls.endDate.setValue(date.value);
	}


	onNoClick(): void {
		this.dialogRef.close();
	}


	private addDetailField() : void {
		const control = <FormArray>this.data.controls['additionalDetails'];
		control.push(this.eventsComponent.initDetailField());
	}

	private removeDetailField(i: number) : void {
		const control = <FormArray>this.data.controls['additionalDetails'];
		control.removeAt(i);
	}

}
