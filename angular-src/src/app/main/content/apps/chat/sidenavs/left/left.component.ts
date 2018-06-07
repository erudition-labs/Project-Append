import { Component, OnInit } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { ChatService } from '../../chat.service';

@Component({
    selector   : 'fuse-chat-left-sidenav',
    templateUrl: './left.component.html',
    styleUrls  : ['./left.component.scss'],
    animations : fuseAnimations
})
export class FuseChatLeftSidenavComponent implements OnInit
{
    view: string;

    constructor(private chatService: ChatService)
    {
        this.view = 'chats';
    }

    ngOnInit()
    {
        this.chatService.onLeftSidenavViewChanged.subscribe(view => {
            this.view = view;
        });
    }

}
