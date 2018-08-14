import { Component, OnInit  } from '@angular/core';
import { NgForm             } from '@angular/forms';
import { AuthService        }  from "../../services/auth.service";
import { MessageService     } from '../../services/message.service';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
   name         : String;
   username     : String;
   email        : String;
   password     : String;
   accessLevel  : String;
  constructor(private authService       : AuthService,
              private messageService    : MessageService) { }
  ngOnInit() {
  }

  onSubmit(form: NgForm) {
     const user = {
        name    : form.value.name,
        email   : form.value.email,
        access  : form.value.access,
        username: form.value.username,
        password: form.value.password
     };
      console.log(user);

      this.authService.registerUser(user)
         .subscribe( data => console.log(data));
      form.reset();
      this.messageService.sendMessage("User Created");
 }

}
