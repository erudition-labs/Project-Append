import { Component, OnInit } from '@angular/core';
import { UpdatesService } from '../../@core/updates/updates.service';
import { Update } from '../../@core/updates/update.model';
import { AuthService } from '../../@core/auth/auth.service';
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

  constructor(private updatesService : UpdatesService, private authService : AuthService, private toast : ToastrService, private formBuilder : FormBuilder,) { }

  updates : Update[] = [];
  singleUpdate : Boolean = false;
  update : Update;
  closeResult: string;
  addUpdateClicked : Boolean = false;
  updateForm: FormGroup;

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
    
    this.updatesService.createUpdate(update).subscribe((result) => {
      console.log(result.message);
    });
    location.reload();
  }

  private singleUpdateSet(update : Update) {
    this.singleUpdate = true;
    this.update = update;
  }

  private back() {
    this.singleUpdate = false; 
  }

  public createUpdate(): void {
    console.log(this.authService.isAuthenticated());
    console.log(this.authService.isAdmin());
    
    
		if(this.authService.isAuthenticated() && this.authService.isAdmin()) {
      this.addUpdateClicked = true;
		} else {
			//tell them they no have access
      this.error('You are not authorized');
      this.addUpdateClicked = false;
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
