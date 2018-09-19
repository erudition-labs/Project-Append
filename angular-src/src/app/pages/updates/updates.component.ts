import { Component, OnInit } from '@angular/core';
import { UpdatesService } from '../../@core/updates/updates.service';
import { Update } from '../../@core/updates/update.model';
import { AuthService } from '../../@core/auth/auth.service';
import { UserService } from '../../@core/user/user.service';

import { ToastrService } from 'ngx-toastr';
import {
	FormGroup,
	FormBuilder,
	FormControl,
	Validators
} from '@angular/forms'


@Component({
  selector: 'updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent implements OnInit {

  constructor(private updatesService : UpdatesService, 
              public authService : AuthService, 
              private toast : ToastrService, 
              private formBuilder : FormBuilder,
              private userService : UserService,
              ) { }

  updates : Update[] = [];
  singleUpdate : Boolean = false;
  update : Update;
  edittedUpdate : Update;
  closeResult: string;
  addUpdateClicked : Boolean = false;
  editButtonClicked : Boolean = false;
  updateForm: FormGroup;
  editForm: FormGroup;


  ngOnInit() {
    this.updatesService.getUpdates().subscribe((result) => {
      this.updates = result.result;
      for(let update of this.updates) {
        update.date = new Date(update.date);
      }
    });
    this.createForm();
  }

  private createForm() : void {
		this.updateForm = this.formBuilder.group({
			title 		: new FormControl('', {}),
      content 	: new FormControl('', {}),
      author    : new FormControl('', {}),
      date      : new FormControl('', {}),
    });
    
    this.editForm = this.formBuilder.group({
			title 		: new FormControl('', {}),
      content 	: new FormControl('', {}),
      author    : new FormControl('', {}),
      date      : new FormControl('', {}),
		});
  }
  
  public onClick() : void {

		this.updateForm.controls.title.markAsDirty();
		this.updateForm.controls.content.markAsDirty();

		const { title, content, author, date } = this.updateForm.value;
		const update : Update = {
			title,
      content,
      author,
      date
    };

    update.date = new Date();
    update.author = this.authService.parseToken().sub;

    this.addUpdateClicked = false;
    this.editButtonClicked = false;
    

    this.updatesService.createUpdate(update).subscribe((result) => {
      this.userService.getUser(result.result.author).subscribe((user) => {
        result.result.author = user.result;
      });
      result.result.date = new Date(result.result.date);

      this.updates.splice(0, 0, result.result);
      
    });
  }

  public onClickEdit() : void {
    this.singleUpdate = true;
    this.addUpdateClicked = false;
    this.editButtonClicked = false;
		this.editForm.controls.title.markAsDirty();
		this.editForm.controls.content.markAsDirty();

		const { title, content, author, date } = this.editForm.value;
		const edittedUpdate : Update = {
			title,
      content,
      author,
      date
    };

    edittedUpdate.author = this.update.author;
    edittedUpdate.date = this.update.date;
    edittedUpdate._id = this.update._id;
    this.addUpdateClicked = false;
    this.editButtonClicked = false;

    this.updatesService.editUpdate(edittedUpdate).subscribe((result) => {
      this.success(result.message)
      this.update = result.result;
      this.update.date = new Date(result.result.date);
      

      const index = this.updates.findIndex(update => result.result._id === update._id);

      this.updates[index] = result.result;
      this.updates[index].date = new Date(result.result.date);
      
    });
  }

  private populateForm() : void {
		this.createForm();

		//get data from currently opened section
		let data = this.update;

		//populate formControls
		this.editForm.get('title').setValue(data.title);
		this.editForm.get('content').setValue(data.content);
	
	}


  private singleUpdateSet(update : Update) {
    this.singleUpdate = true;
    this.update = update;
    this.editButtonClicked = false;

  }

  private back() {
    this.singleUpdate = false; 
    this.addUpdateClicked = false;
    this.editButtonClicked = false;

  }

  public createUpdate(): void {
    this.createForm();
		if(this.authService.isAuthenticated() && this.authService.isAdmin()) {
      this.addUpdateClicked = true;
      this.singleUpdate = false;
      
		} else {
			//tell them they no have access
      this.error('You are not authorized');
      this.addUpdateClicked = false;
		}
  }

  private edit() {
    this.editButtonClicked = true;
    if(this.authService.isAuthenticated() && this.authService.isAdmin()) {
      this.populateForm();
    }
  }

  delete(update) {

    if (window.confirm('Are you sure you want to delete?')) {
      this.updatesService.deleteUpdate(update._id).subscribe((result) => {
        
        if(result.success) {
          this.singleUpdate = false;
          this.success('Post Deleted');

          const index = this.updates.findIndex(update => update._id === result.result._id);
          this.updates.splice(index, 1);

        } else {
          this.error("Did not delete post :(");
        }
      });
      
    } else {
      this.error("Did not delete post :(");
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

}
