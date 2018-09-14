import { Component, OnInit } from '@angular/core';
import { UpdatesService } from '../../@core/updates/updates.service';
import { Update } from '../../@core/updates/update.model';
import { AuthService } from '../../@core/auth/auth.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent implements OnInit {

  constructor(private updatesService : UpdatesService, private authService : AuthService, private toast : ToastrService,) { }

  updates : Update[] = [];
  singleUpdate : Boolean = false;
  update : Update;
  closeResult: string;


  ngOnInit() {
    this.updatesService.getUpdates().subscribe((result) => {
      this.updates = result.result;
      for(let update of this.updates) {
        update.date = new Date(update.date);
      }
  });
  }

  private singleUpdateSet(update : Update) {
    this.singleUpdate = true;
    this.update = update;
  }

  private back() {
    this.singleUpdate = false; 
  }

  public openCreateDialog(): void {
		if(this.authService.isAuthenticated() && this.authService.isAdmin()) {
      this.success('You are authorized');
		} else {
			//tell them they no have access
			this.error('You are not authorized');
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
