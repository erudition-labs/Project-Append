import { 
	Component, 
	OnInit,
	Inject,
} from '@angular/core';
import {
	FormGroup,
	FormArray,
	FormBuilder,
} from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { 
	MatDialogRef, 
	MAT_DIALOG_DATA
} from '@angular/material';


import { User } from './../../../@core/user/user.model';

import { AuthService } from './../../../@core/auth/auth.service';
import { UserService } from './../../../@core/user/user.service';


@Component({
	selector: 'dialog-overview-create-event',
	templateUrl: './dialog-overview-create-event.html',
	styleUrls: ['./dialog-overview-create-event.scss']
})
export class DialogOverviewEventComponent implements OnInit {		

	users : Observable<User[]>;
	selectedUsers = [];
	signupText : string;
	isClosed : boolean;
	isCapDisabled : boolean;

	constructor( 
		public dialogRef: MatDialogRef<DialogOverviewEventComponent>,
			@Inject(MAT_DIALOG_DATA) public data: any,
			private formBuilder 	: FormBuilder,
			private userService 	: UserService,
			public authService		: AuthService) {}

		 isAdmin : boolean = false;
		 ishiddenSpots : boolean;


	ngOnInit() {
		this.users = this.userService.getUsers();
		this.isAdmin = this.authService.isAdmin();
		this.isClosed = this.data.get('isClosed').value;

		if(this.data.get('spots').value === -1) {
			this.isCapDisabled = true;
			this.ishiddenSpots = false;
		} else {
			this.isCapDisabled = false;
			this.ishiddenSpots = true;
		}
	}

	toggleCap() : void {
		if(!this.isCapDisabled) {
			this.data.get('spots').setValue(-1);
			this.ishiddenSpots = false;
		} 

		if(this.isCapDisabled) {
			this.data.get('spots').setValue(null);
			this.ishiddenSpots = true;
		}
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	enableSignups() : void {
		this.data.get('isClosed').setValue(false);
		this.data.get('spots').setValue(null);
		this.isClosed = false;	
	}

	disableSignups() : void {
		this.data.get('isClosed').setValue(true);
		this.data.get('spots').setValue(0);
		this.isClosed = true;		
	}

	public addDetailField() : void {
		const control = <FormArray>this.data.controls['additionalDetails'];
		control.push(this.initDetailField());
	}

	private removeDetailField(i: number) : void {
		const control = <FormArray>this.data.controls['additionalDetails'];
		control.removeAt(i);
    }

    public initDetailField() : FormGroup {
		return this.formBuilder.group({
			title	: [''],
			details	: ['']
		});
	}

}