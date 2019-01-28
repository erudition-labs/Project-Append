import { 
	Component, 
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	ViewChild,
	TemplateRef,
	OnInit,

} from '@angular/core';

import {
	FormGroup,
	FormArray,
	FormBuilder,
	FormControl,
	Validators
} from '@angular/forms';


import {
	isSameDay,
	isSameMonth,
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
} from '@angular/material';
import { ToastrService } from 'ngx-toastr';



import { Event } from '../../@core/events/event.model';
import { User } from '../../@core/user/user.model';
import { EventsService } from '../../@core/events/events.service';
import { AuthService } from '../../@core/auth/auth.service';
import { UserService } from '../../@core/user/user.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DialogOverviewEventComponent } from './events-dialog/dialog-overview-create-event.component';


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
	},
	green: {
		primary: '#008000',
		secondary: '#008000'
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
	@ViewChild(MatPaginator) paginator: MatPaginator;


	displayedColumns: string[] = ['title', 'date'];

	 view: string = 'month';
	 viewDate: Date = new Date();

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

	 refresh: Subject<any> = new Subject();
	 events: CalendarEvent[] = [];
	 activeDayIsOpen: boolean = true;
	 newEventForm : FormGroup;
	 dataSource : any;

	constructor(private modal				: NgbModal,
				private dialog				: MatDialog,
				private formBuilder 		: FormBuilder,
				private eventsService		: EventsService,
				public authService			: AuthService,
				private toast				: ToastrService,
				private userService			: UserService,
				private changeDetectorRef	: ChangeDetectorRef) { }

	ngOnInit() {
		this.eventsService.getEvents().subscribe((result) => {
			if(result) {
				for(let e of result) {
					let color = colors.red;
					if(this.eventsService.isPending(e)) {
						color = colors.yellow;
					} else if(this.eventsService.isSignedUp(e)) {
						color = colors.green;
					} else {
						color = colors.red;
					}

					if(this.authService.isAdmin() && !e.isVerified) {
						color = colors.blue;
					}

					//create calendar event
					const calendarEvent : CalendarEvent = {
						start		: new Date(e.date[0]),
						end			: new Date(e.date[1]),
						title		: e.name,
						color		: color,
						actions		: this.actions,
						draggable	: false,
						meta		: e, //append our event object to it
					};
					calendarEvent.meta.additionalDetails = JSON.parse(calendarEvent.meta.additionalDetails);
					this.events.push(calendarEvent); //put it on the calendar
				}

			}
			this.refresh.next();
			this.dataSource = new MatTableDataSource<CalendarEvent>(this.events);
			this.dataSource.paginator = this.paginator;
		});	

		 // this.changeDetectorRef.markForCheck();
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

	eventTimesChanged({ //in case we ever to decide to make events draggable
		event,
		newStart,
		newEnd
	}: CalendarEventTimesChangedEvent): void {
		event.start = newStart;
		event.end = newEnd;
		this.refresh.next();
	}

	handleEvent(action: string, event: CalendarEvent): void {
		this.modalData = { event, action };
		this.modal.open(this.modalContent, { size: 'lg' });
	}

	onCustom(event) {
		alert(`Custom event '${event.action}' fired on row №: ${event.data._id}`)
	  }
	private createForm(): void {
		this.newEventForm = this.formBuilder.group({
			name					: new FormControl('', 		{ validators: [Validators.required] }),
			isVerificationRequired 	: new FormControl('true', 	{ validators: [Validators.required] }),
			isVerified				: new FormControl('false', 	{ validators: [Validators.required] }),
			isClosed				: new FormControl('false', 	{ validators: [Validators.required] }),
			date					: new FormControl([], 		{ validators: [Validators.required] }),
			summary					: new FormControl('', { }),
			OIC						: new FormControl([], { }),
			signedUp				: new FormControl([], { }),
			pending					: new FormControl([], { }),
			author					: new FormControl('', { }),
			spots					: new FormControl('', { validators: [this.validateNumber.bind(this), Validators.required] }),
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
		this.newEventForm.get('isClosed').setValue(data.isClosed);
		this.newEventForm.get('date').setValue(data.date);
		this.newEventForm.get('summary').setValue(data.summary);
		this.newEventForm.get('OIC').setValue(data.OIC);
		this.newEventForm.get('signedUp').setValue(data.signedUp);
		this.newEventForm.get('pending').setValue(data.pending);
		this.newEventForm.get('author').setValue(data.author);
		this.newEventForm.get('spots').setValue(data.spots);

		
		data.additionalDetails.forEach(function(obj) {  //populate formArray
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
				_id,
				name,
				isVerificationRequired,
				isVerified,
				isClosed,
				date,
				summary,
				OIC,
				signedUp,
				pending,
				author,
				spots,
				additionalDetails
			} = result.value;

		const newEvent : Event = {
			_id,
			name,
			isVerificationRequired,
			isVerified,
			isClosed,
			date,
			summary,
			OIC,
			signedUp,
			pending,
			author,
			spots,
			additionalDetails
		};	

		newEvent.additionalDetails = JSON.stringify(result.get('additionalDetails').getRawValue());
		return newEvent;
	}

	public openCreateDialog(): void {
		if(this.authService.isAuthenticated() && this.authService.isAdmin()) {
			this.createForm();
			const dialogRef = this.dialog.open(DialogOverviewEventComponent, {
				data: this.newEventForm 
			});

			dialogRef.afterClosed().subscribe(result => {
				if(typeof result === 'undefined' || result == null) { return; }
				if(result.valid) {
					let newEvent = this.dialogDataToEvent(result);
					newEvent.author = this.authService.parseToken().sub;

					//check dates
					if(!newEvent.date[0]) newEvent.date[0] = newEvent.date[1];
					if(!newEvent.date[1]) newEvent.date[1] = newEvent.date[0];
					if(!newEvent.date[0] && !newEvent.date[1]){
						newEvent.date[0] = new Date();
						newEvent.date[0] = new Date();
					}
					//In the case of creating event for OIC to edit, automatically sign them up
					newEvent.signedUp = newEvent.OIC;
					this.eventsService.createEvent(newEvent).subscribe(
						result => {
							if(result) {
								newEvent._id = result._id;
								newEvent.additionalDetails = JSON.parse(newEvent.additionalDetails);

								this.events.push({
									title	: newEvent.name,
									start	: newEvent.date[0],
									end		: newEvent.date[1],
									color	: colors.red,
									meta	: newEvent
								});
								this.refresh.next();
							}
						}); 
					}
			});
		} else {
			//tell them they no have access
			this.error('You are not authorized');
		}
	}

	public openUpdateDialog(): void {
		if((this.authService.isAuthenticated() && this.authService.isAdmin()) ||
			this.authService.isAuthenticated() && this.eventsService.isOIC(this.modalData.event.meta)) {
			
			this.populateFormFromModal();
			let dialogRef = this.dialog.open(DialogOverviewEventComponent, {
				data : this.newEventForm
			});

			dialogRef.afterClosed().subscribe(result => {
				if(typeof result === 'undefined' || result == null) { return; }
				if(result.valid) {
					let newEvent = this.dialogDataToEvent(result);
					//be sure to attatch the id of the event since we are editing
					let tmp = result.get('OIC').value;
					newEvent.OIC = tmp;
					console.log(tmp);
					newEvent._id = this.modalData.event.meta._id; 

				//validate dates
				if(!newEvent.date[0]) newEvent.date[0] = newEvent.date[1];
				if(!newEvent.date[1]) newEvent.date[1] = newEvent.date[0];
				if(!newEvent.date[0] && !newEvent.date[1]) {
					newEvent.date = this.modalData.event.meta.date;
				}

				if(this.eventsService.isSpotsLeft(newEvent)) {
					newEvent.isClosed = false;
				} else {
					newEvent.isClosed = true;
				}
				console.log(newEvent);

					this.eventsService.updateEvent(newEvent).subscribe(
						result => {
							if(result) {
								let index = this.events.findIndex(x => x.meta._id === newEvent._id);
								if(index === -1) return; //no event to update	

								let updatedCalendarEvent : CalendarEvent = {
									title	: result.name,
									start	: new Date(result.date[0]),
									end		: new Date(result.date[1]),
									color	: colors.red,
									meta	: result
								};								
								
							updatedCalendarEvent.meta.additionalDetails = JSON.parse(updatedCalendarEvent.meta.additionalDetails);

							this.events[index] = updatedCalendarEvent;
							this.refresh.next();
							} 
					});
				}
			});
		} else {
			//toast they dont have access
			this.error('You are not authorized');
		}
	}

	private unregister() : void {
		if(this.eventsService.isSignedUp(this.modalData.event.meta) ||
			this.eventsService.isPending(this.modalData.event.meta)) 
		{
			let event = Object.assign({}, this.modalData.event.meta);

			this.eventsService.unregisterUser(event)
			.subscribe(result => {
				if(result) {
					let index = this.events.findIndex(x => x.meta._id === this.modalData.event.meta._id);

					if(index > -1) {
						this.userService.eventUnregister(result).subscribe(user => {
							if(result) {
								this.events[index].meta.signedUp = result.signedUp;
								this.modalData.event.meta.signedUp = result.signedUp;

								this.events[index].meta.pending = result.pending;
								this.modalData.event.meta.pending = result.pending;

								this.events[index].meta.isClosed = result.isClosed;
								this.modalData.event.meta.isClosed = result.isClosed;
							}
						});
					} else {
						//event doesnt exist
						this.error('Something went wrong. This event doesn\'t exist!');
					}
				}
			});
		} else {
				//Nothing to be done, some error
				this.error('Nothing to be done');
		}
	}

	private userPending() : void {
		if(!this.eventsService.isSignedUp(this.modalData.event.meta) &&
			!this.eventsService.isPending(this.modalData.event.meta) &&
			this.eventsService.isSpotsLeft(this.modalData.event.meta)) 
		{
			let event = Object.assign({}, this.modalData.event.meta);

			this.eventsService.userPending(event)
			.subscribe(result => {
				if(result) {
					let index = this.events.findIndex(x => x.meta._id === this.modalData.event.meta._id);

					if(index > -1) {
						this.events[index].meta.pending = result.pending;
						this.modalData.event.meta.pending = result.pending;
						this.modalData.event.color = colors.yellow;
						this.refresh.next();
					} else {
						//no event exists in frontend
						this.error('Something went wrong. This event doesn\' exist!');
					}
				}
			}, error => {
				console.log(error);
				this.error('API Error');
			});
		} else {
			//nothing to be
			this.error('Signups Closed');
		}
	}


	private acceptPending(id : string) : void {
		if(!this.eventsService.isSignedUp(this.modalData.event.meta, id) &&
			this.eventsService.isPending(this.modalData.event.meta, id) &&
			this.eventsService.isSpotsLeft(this.modalData.event.meta)) 
		{ 
			let event = Object.assign({}, this.modalData.event.meta);

			this.eventsService.acceptPending(event, id)
			.subscribe(result => {
				if(result) {
					let index = this.events.findIndex(x => x.meta._id === this.modalData.event.meta._id);

					if(index > -1) {
						this.events[index].meta.pending = result.pending;
						this.modalData.event.meta.pending = result.pending;

						this.events[index].meta.signedUp = result.signedUp;
						this.modalData.event.meta.signedUp = result.signedUp;


						this.events[index].meta.isClosed = result.isClosed;
						this.modalData.event.meta.isClosed = result.isClosed;
						//this.refresh.next();
					} else {
						//no event exists in frontend
						this.error('Something went wrong. This event doesn\' exist!');
					}
				} 
			}, error => {
				console.log(error);
				this.error('API Error');
			});
		} else {
			//nothing to be
			this.error('Signups Closed');
		}

	}

	private rejectPending(id : string) : void {
		if(!this.eventsService.isSignedUp(this.modalData.event.meta, id) &&
		this.eventsService.isPending(this.modalData.event.meta, id)) 
		{
			let index = this.modalData.event.meta.pending.findIndex(x => x._id === id);
			if(index > -1) { //if we find an index
				this.modalData.event.meta.pending.splice(index, 1);
				let event = Object.assign({}, this.modalData.event.meta);
				this.eventsService.unregisterUser(event)
				.subscribe(result => {
					if(result) {
						//successsss
					} else {
						console.log('RIPPP' + result);
						//faileddddd
					}
				}, error => {
					console.log(error);
					this.error('API Error');
				});
			} //otherwise something is terribly terribly worng lol
		} else {
			//Nothing to reject
			this.error('Nothing to be done');
		}
	}

	public removeSignedUp(id: string) : void {
		if(this.eventsService.isSignedUp(this.modalData.event.meta, id) &&
			!this.eventsService.isPending(this.modalData.event.meta, id)) {
				let index = this.modalData.event.meta.signedUp.findIndex(x => x._id === id);
				if(index > -1) { //if we find an index
					this.modalData.event.meta.signedUp.splice(index, 1);
					let event = Object.assign({}, this.modalData.event.meta);

					this.eventsService.unregisterUser(event)
					.subscribe(result => {
						if(result) {
							this.modalData.event.meta = result;
							this.modalData.event.meta.additionalDetails = JSON.parse(this.modalData.event.meta.additionalDetails);

							this.changeDetectorRef.markForCheck();
							//success
						} 
				}, error => {
					console.log(error);
					this.error('API Error');
				});
			} //otherwise something is terribly terribly worng lol
		} else {
			//Nothing to reject
			this.error('Nothing to be done');
		}
			
	}

	private error(msg : string) : void {
		this.toast.error(msg, 'Error!', {
			timeOut: 5000,
			closeButton: true,
			progressBar: true,
			progressAnimation: 'decreasing',
			positionClass: 'toast-top-right',
		  });
	}

	private success(msg: string) : void {
		this.toast.success(msg, 'Success!', {
			timeOut: 5000,
			closeButton: true,
			progressBar: true,
			progressAnimation: 'decreasing',
			positionClass: 'toast-top-right',
		  });
	}

	private parseDate(d : Date) : string {
		let date = d.toDateString();
		date = date + " " + d.getHours() + ":" + d.getMinutes(); 
		return date;
	}

	public applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	  }


	private validateNumber(control: FormControl): { [s: string]: boolean } {
		//if (control.value === null) return null;
  		if (isNaN(control.value)) return { 'NaN': true };
		return null; 
	}
}

