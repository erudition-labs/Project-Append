import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../../chat.service';

@Component({
    selector   : 'fuse-chat-contact-sidenav',
    templateUrl: './contact.component.html',
    styleUrls  : ['./contact.component.scss']
})
export class FuseChatContactSidenavComponent implements OnInit
{
    contact: any;

    constructor(private chatService: ChatService)
    {

    }

    ngOnInit()
    {
        this.chatService.onContactSelected.subscribe(contact => {
            this.contact = contact;
        });
    }

}
