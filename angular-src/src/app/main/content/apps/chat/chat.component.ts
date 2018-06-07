import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { ChatService } from './chat.service';

@Component({
    selector     : 'fuse-chat',
    templateUrl  : './chat.component.html',
    styleUrls    : ['./chat.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class FuseChatComponent implements OnInit
{
    selectedChat: any;

    constructor(private chatService: ChatService)
    {
    }

    ngOnInit()
    {
        this.chatService.onChatSelected
            .subscribe(chatData => {
                this.selectedChat = chatData;
            });
    }

}
