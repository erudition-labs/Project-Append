import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatRadioModule, MatSidenavModule, MatToolbarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { ChatService } from './chat.service';
import { FuseChatComponent } from './chat.component';
import { FuseChatViewComponent } from './chat-view/chat-view.component';
import { FuseChatStartComponent } from './chat-start/chat-start.component';
import { FuseChatChatsSidenavComponent } from './sidenavs/left/chats/chats.component';
import { FuseChatUserSidenavComponent } from './sidenavs/left/user/user.component';
import { FuseChatLeftSidenavComponent } from './sidenavs/left/left.component';
import { FuseChatRightSidenavComponent } from './sidenavs/right/right.component';
import { FuseChatContactSidenavComponent } from './sidenavs/right/contact/contact.component';

const routes: Routes = [
    {
        path     : '**',
        component: FuseChatComponent,
        children : [],
        resolve  : {
            chat: ChatService
        }
    }
];

@NgModule({
    declarations: [
        FuseChatComponent,
        FuseChatViewComponent,
        FuseChatStartComponent,
        FuseChatChatsSidenavComponent,
        FuseChatUserSidenavComponent,
        FuseChatLeftSidenavComponent,
        FuseChatRightSidenavComponent,
        FuseChatContactSidenavComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatRadioModule,
        MatSidenavModule,
        MatToolbarModule,

        FuseSharedModule
    ],
    providers   : [
        ChatService
    ]
})
export class FuseChatModule
{
}
