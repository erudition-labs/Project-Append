import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
	FormGroup,
	FormBuilder,
	FormControl,
	Validators
} from '@angular/forms';
import { UpdatesService } from '../../../../@core/updates/updates.service';
import { Update } from '../../../../@core/updates/update.model';
import { TuiService } from 'ngx-tui-editor';
import { AuthService } from '@core/auth/auth.service';
import { UserService } from '@core/user/user.service';

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
    private authService : AuthService,
    private userService : UserService,
    private updatesService : UpdatesService,
    ) { }


    updateForm: FormGroup;
    update : Update;
    markdown : any = "";
    options : any = {
      initialValue: `# Edit Me!` ,
      initialEditType: 'wysiwyg',
      previewStyle: 'vertical',
      height: 'auto',
      minHeight: '500px' 
    };



  ngOnInit() {
    this.createForm();
  }

  public createForm() : void {
    this.updateForm = this.formBuilder.group({
      title 		: new FormControl('', { validators: [Validators.required] }),
      content 	: new FormControl('', { }),
      author    : new FormControl('', {}),
      date      : new FormControl('', {}),
    });
  }

  public save() {
    this.updateForm.controls.title.markAsDirty();
    
    const { title, content, author, date } = this.updateForm.value;
    const update : Update = {
      title,
      content,
      author,
      date
    };

    update.content = this.editorService.getMarkdown();
    update.date = new Date();
    update.author = this.authService.parseToken().sub;

    this.updatesService.createUpdate(update).subscribe((result) => {
      this.userService.getUser(result.result.author).subscribe((user) => {
        result.result.author = user;
      });
      result.result.date = new Date(result.result.date);
      if(result.success) {
        //return the result to news component to put in array
        this.dialogRef.close(result.result);
      } else {
        //error
        console.log("ERROR");
      }  
    });
  }
}
