import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService                } from '../../services/auth.service';
import { Router                     } from '@angular/router';
import { FlashMessagesService       } from 'angular2-flash-messages';
import { FormControl, Validators    } from '@angular/forms';

@Component({
    selector: 'app-splashPage',
    templateUrl: './splashPage.component.html',
    styleUrls: ['./splashPage.component.css']
})
export class SplashPageComponent implements OnInit {
    username:String;
    password:String;

    userForm     = new FormControl('', [Validators.required]);
    passwordForm = new FormControl('', [Validators.required]);

    constructor(private authService  :AuthService,
        private router               :Router,
        private flashMessageService  : FlashMessagesService
    ) { }
    ngOnInit() {
    }

    onClick() {
        const user = {
            username: this.username,
            password: this.password
        } //submit through the auth service to the backend authentication route

        this.authService.authenticateUser(user).subscribe(data => {
            if(data.success) {
                this.authService.storeUserData(data.token, data.user);
                //this.flashMessageService.show('Login Success!', {cssClass: 'alert-success', timeout:5000, closeOnClick:true});
                this.router.navigate(['notifications']);
            } else {
                //this.flashMessageService.show(data.msg, {cssClass: 'alert-danger', timeout:5000, closeOnClick:true});
                this.router.navigate(['login']);
            }
        });
    }

    getErrorMessage() {
        if(this.userForm.hasError('required') ||
        this.passwordForm.hasError('required'))
        return 'You must enter a value';
    }

}
