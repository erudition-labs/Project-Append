import { Component, Inject, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgxPermissionsService } from 'ngx-permissions';


import { Store, Select } from '@ngxs/store';
import { User } from '@core/user/user.model';


import { TokenAuthService } from '@core/auth/tokenAuth.service';
import { Subject, Observable } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';



@Component({
    selector     : 'user-event-form-dialog',
    templateUrl  : './user-form.component.html',
    styleUrls    : ['./user-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class UserFormDialogComponent implements OnDestroy, OnInit
{
    userForm: FormGroup;
    private ngUnsubscribe = new Subject();
    dialogTitle: string;


    constructor(
        public matDialogRef: MatDialogRef<UserFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _tokenAuthService: TokenAuthService,
        private _store: Store,
        private _permissionsService: NgxPermissionsService
    ) {
        this.dialogTitle = _data.fullName;
        this.userForm = this.createEventForm();
    }

    ngOnInit() : void {
        this._permissionsService.flushPermissions();
        this._permissionsService.addPermission('ADMIN', () => {
            return ((this._tokenAuthService.isAuthenticated() && this._tokenAuthService.isAdmin()));
        });
    }

    createEventForm(): FormGroup {
        let form = this._formBuilder.group({
            _id         : new FormControl(this._data._id,{ validators: [Validators.required] }),
            email       : new FormControl(this._data.email,{ validators: [Validators.required] }),
            firstName   : new FormControl(this._data.firstName,{ validators: [Validators.required] }),
            lastName    : new FormControl(this._data.lastName,{ validators: [Validators.required] }),
            rank        : new FormControl(this._data.rank),
            flight      : new FormControl(this._data.flight),
            team        : new FormControl(this._data.team),
            role        : new FormControl(this._data.role,{ validators: [Validators.required] }),
            phone       : new FormControl(this._data.phone),
            events      : new FormControl(this._data.events),
            fullName    : new FormControl(this._data.fullName,{ validators: [Validators.required] }),
            isChangelogViewed: new FormControl(this._data.isChangelogViewed,{ validators: [Validators.required] }),
        });

        return form;
        
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
        this._permissionsService.removePermission('ADMIN');

    }

}
