import { Component, OnInit    } from '@angular/core';
import { ValidateService      } from '../../services/validate.service';
import { AuthService          } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router               } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  name      :String;
  username  :String;
  access    :String;
  email     :String;
  password  :String;


//anytime we use a service from another component, we need to inject it into the
//constructor
  constructor(private validateService :ValidateService,
              private flashMessage    :FlashMessagesService,
              private authService     :AuthService,
              private router          :Router
            ) { }

  ngOnInit() {
  }
  onRegisterSubmit() {
      const user = {
        name      : this.name,
        email     : this.email,
        access    : this.access,
        username  : this.username,
        password  : this.password
    }

    //Required fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please enter all fields', {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    //Validate email
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please enter a valid email', {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    //register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('You are now Registered and can login', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['/register']);
      }
    });
  }
}
