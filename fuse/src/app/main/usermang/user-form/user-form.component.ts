import { Component, Inject, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgxPermissionsService } from 'ngx-permissions';


import { Store, Select } from '@ngxs/store';
import { User } from '@core/user/user.model';


import { TokenAuthService } from '@core/auth/tokenAuth.service';
import { Subject, Observable } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { UserUpdate } from '@core/store/users/users.actions';



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
    editing: boolean = false;


    constructor(
        public matDialogRef: MatDialogRef<UserFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _tokenAuthService: TokenAuthService,
        private _store: Store,
        private _permissionsService: NgxPermissionsService
    ) {}

    ngOnInit() : void {
        this._permissionsService.flushPermissions();
        this._permissionsService.addPermission('ADMIN', () => {
            return ((this._tokenAuthService.isAuthenticated() && this._tokenAuthService.isAdmin()));
        });
        this.dialogTitle = this._data.fullName;
        this.userForm = this.createEventForm();
        this.userForm.disable();
    }

    createEventForm(): FormGroup {
        return new FormGroup({
            _id         : new FormControl(this._data._id, Validators.required),
            email       : new FormControl(this._data.email, Validators.required),
            firstName   : new FormControl(this._data.firstName, Validators.required),
            lastName    : new FormControl(this._data.lastName, Validators.required),
            rank        : new FormControl(this._data.rank),
            flight      : new FormControl(this._data.flight),
            team        : new FormControl(this._data.team),
            role        : new FormControl(this._data.role, Validators.required),
            phone       : new FormControl(this._data.phone),
            events      : new FormControl(this._data.events),
            fullName    : new FormControl(this._data.fullName, Validators.required),
            isChangelogViewed: new FormControl(this._data.isChangelogViewed, Validators.required)
        });        
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
        this._permissionsService.removePermission('ADMIN');
    }

    editUser(): void {
        this.editing = true;
        this.userForm.enable();
    }

    saveUser() : void {
        let newUser = this.userForm.getRawValue() as User
        newUser.fullName = newUser.lastName + ", " + newUser.firstName;
        this._store.dispatch(new UserUpdate({ user: newUser }));
    }

}
