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

import { Subject } from 'rxjs';
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

import { Event } from '../../@core/events/event.model';
import { EventsService } from '../../@core/events/events.service';


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
			const calendarEvent : CalendarEvent = {
				start		: startOfDay(new Date()),
				end			: endOfDay(new Date()),
				title		: result.result[0].name,
				color		: colors.red,
				actions		: this.actions,
				draggable	: true,
			};
			this.events.push(calendarEvent);
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
			name					: new FormControl('', { validators: [Validators.required] }),
			isVerificationRequired 	: new FormControl('true', { validators: [Validators.required] }),
			isVerified				: new FormControl('false', { validators: [Validators.required] }),
			isSignupRequired		: new FormControl('true', { validators: [Validators.required] }),
			startDate				: new FormControl({ value:'', disabled: true }),
			endDate					: new FormControl({ value:'', disabled: true }),
			OIC						: new FormControl('', { }),
			signedUp				: new FormControl('', { }),
			additionalDetails		: new FormControl('', { })
		});
	}

	openCreateDialog(): void {
		this.createForm();
		const dialogRef = this.dialog.open(DialogOverviewEventComponent, {
		data: this.newEventForm //{} //{name: this.name, animal: this.animal}
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			//this.animal = result;
		});
	}
}

@Component({
	selector: 'dialog-overview-create-event',
	templateUrl: 'dialog-overview-create-event.html',
	})
	export class DialogOverviewEventComponent {

	constructor( 
		public dialogRef: MatDialogRef<DialogOverviewEventComponent>,
			@Inject(MAT_DIALOG_DATA) public data: any,
			private formBuilder : FormBuilder) {
				console.log(data);
			}

	onNoClick(): void {
		this.dialogRef.close();
	}

}
