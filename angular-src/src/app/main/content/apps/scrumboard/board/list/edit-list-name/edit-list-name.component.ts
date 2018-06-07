import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector   : 'fuse-scrumboard-board-edit-list-name',
    templateUrl: './edit-list-name.component.html',
    styleUrls  : ['./edit-list-name.component.scss']
})
export class FuseScrumboardBoardEditListNameComponent
{
    formActive = false;
    form: FormGroup;
    @Input() list;
    @Output() onNameChanged = new EventEmitter();
    @ViewChild('nameInput') nameInputField;

    constructor(
        private formBuilder: FormBuilder
    )
    {
    }

    openForm()
    {
        this.form = this.formBuilder.group({
            name: [this.list.name]
        });
        this.formActive = true;
        this.focusNameField();
    }

    closeForm()
    {
        this.formActive = false;
    }

    focusNameField()
    {
        setTimeout(() => {
            this.nameInputField.nativeElement.focus();
        });
    }

    onFormSubmit()
    {
        if ( this.form.valid )
        {
            this.list.name = this.form.getRawValue().name;
            this.onNameChanged.next(this.list.name);
            this.formActive = false;
        }
    }

}
