import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AuthService } from '../../@core/auth/auth.service';
import { UserService } from '../../@core/user/user.service';
import { User } from '../../@core/user/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  constructor(private userService : UserService, private authService : AuthService, private toastr: ToastrService) { }

  private users : User[];
  private isAdmin = this.authService.isAdmin();
  settings : any;


  ngOnInit() {
    
    this.userService.getUsers().subscribe((result) => {
      		this.users = result;
      });

      if(this.isAdmin) {
        this.settings = {
          add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
          },
          edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmSave: true,
          },
          delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
          },
          columns: {
            firstName: {
              title: 'First Name'
            },
            lastName: {
              title: 'Last Name'
            },
            rank: {
              title: 'Rank'
            },
            flight: {
              title: 'Flight'
            },
            team: {
              title: 'Team'
            },
            phone: {
              title: 'Phone'
            },
            email: {
              title: 'Email'
            },
            role: {
              title: 'Role'
            },
          }
        };
      } else {
        this.settings = {
          actions: {
            add: false,
            edit: false,
            delete: false
          },
          add: {
            addButtonContent: '<i class="nb-plus" disabled></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
          },
          edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
          },
          delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
          },
          columns: {
            firstName: {
              title: 'First Name'
            },
            lastName: {
              title: 'Last Name'
            },
            rank: {
              title: 'Rank'
            },
            flight: {
              title: 'Flight'
            },
            team: {
              title: 'Team'
            },
            phone: {
              title: 'Phone'
            },
            email: {
              title: 'Email'
            },
          }
        };
      }
  }

  private onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {

      event.confirm.resolve(event.newData);
      this.userService.updateUser(event.newData._id, event.newData).subscribe((result) => {
        if(result.success) {
          this.toastr.success(event.newData.firstName + '\'s acount has been updated.', 'Success!', {
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'decreasing',
            positionClass: 'toast-bottom-right',

          });
        }
        
      });
    } else {
      event.confirm.reject();
    }
  }

}
