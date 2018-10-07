import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
	FormGroup,
	FormBuilder,
	FormControl,
	Validators
} from '@angular/forms';
import { TuiService } from 'ngx-tui-editor';

@Component({
  selector: 'app-news-dialog',
  templateUrl: './news-dialog.component.html',
  styleUrls: ['./news-dialog.component.scss']
})
export class NewsDialogComponent implements OnInit {

  constructor(public dialogRef : MatDialogRef<NewsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder : FormBuilder,
    private editorService: TuiService,

    ) { }


    updateForm: FormGroup;
    markdown : any = "";
    options : any = {
      initialValue: `# Title of Project` ,
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height: 'auto',
      minHeight: '498px' 
    };



  ngOnInit() {
    this.createForm();

  }

  public createForm() : void {
    this.updateForm = this.formBuilder.group({
      title 		: new FormControl('', {}),
      content 	: new FormControl('', {}),
      author    : new FormControl('', {}),
      date      : new FormControl('', {}),
    });
  }

  public save() {
    this.dialogRef.close("SAVEDDDD");
  }
}
