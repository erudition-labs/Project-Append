import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UserService } from '../../@core/user/user.service';
import { User } from '../../@core/user/user.model';


@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  constructor(private userService : UserService) { }

  private users : User[];

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
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

  // data = [
  //   {
  //     name: "Leanne Graham",
  //     rank: "Captain",
  //     flight: "Bret",
  //     team: "Rifle",
  //     phone: "661-208-1140"
  //     email: "Sincere@april.biz",
  //   },
  //   // {
  //   //   id: 2,
  //   //   name: "Ervin Howell",
  //   //   username: "Antonette",
  //   //   email: "Shanna@melissa.tv"
  //   // },
    
  //   // // ... list of items
    
  //   // {
  //   //   id: 11,
  //   //   name: "Nicholas DuBuque",
  //   //   username: "Nicholas.Stanton",
  //   //   email: "Rey.Padberg@rosamond.biz"
  //   // }
  // ];

  ngOnInit() {
    this.userService.getUsers().subscribe((result) => {
      		this.users = result;
      });
  }

}
