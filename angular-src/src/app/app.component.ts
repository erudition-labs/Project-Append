import { Component, OnInit, OnDestroy                       } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy   } from '@angular/common';
import { Subscription                                       } from 'rxjs/Subscription';
import { FlashMessagesService                               } from 'angular2-flash-messages';
import { MessageService                                     } from './services/message.service';
import { AuthService                                        } from './services/auth.service';


declare const $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    message         : any;
    subscription    : Subscription;

    constructor(public location     : Location,
        private messageService      : MessageService,
        private flashMessageService : FlashMessagesService,
        private authService         : AuthService
    ) {
        this.subscription = this.messageService.getMessage().subscribe(message => {
            this.message = message;
            this.flashMessageService.show(message.text, {cssClass: 'alert-success', timeout:5000});
        });
    }

    ngOnInit() {
        $.material.options.autofill = true;
        $.material.init();
    }


    isMaps(path){
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice( 1 );
        if(path == titlee){
            return false;
        }
        else {
            return true;
        }
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}
