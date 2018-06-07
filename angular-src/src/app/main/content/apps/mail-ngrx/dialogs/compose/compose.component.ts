import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector     : 'fuse-mail-compose',
    templateUrl  : './compose.component.html',
    styleUrls    : ['./compose.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseMailNgrxComposeDialogComponent
{
    composeForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<FuseMailNgrxComposeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder
    )
    {
        this.composeForm = this.createComposeForm();
    }
    
    createComposeForm()
    {
        return this.formBuilder.group({
            from   : {
                value   : ['johndoe@creapond.com'],
                disabled: [true]
            },
            to     : [''],
            cc     : [''],
            bcc    : [''],
            subject: [''],
            message: ['']
        });

    }

}
