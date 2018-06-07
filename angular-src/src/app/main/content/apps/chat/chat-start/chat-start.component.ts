import { Component } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

@Component({
    selector   : 'fuse-chat-start',
    templateUrl: './chat-start.component.html',
    styleUrls  : ['./chat-start.component.scss'],
    animations : fuseAnimations
})
export class FuseChatStartComponent
{
    constructor()
    {
    }
}
