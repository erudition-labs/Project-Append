import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ChatService } from '../../../chat.service';

@Component({
    selector   : 'fuse-chat-user-sidenav',
    templateUrl: './user.component.html',
    styleUrls  : ['./user.component.scss']
})
export class FuseChatUserSidenavComponent implements OnInit, OnDestroy
{
    user: any;
    onFormChange: any;
    userForm: FormGroup;

    constructor(private chatService: ChatService)
    {
        this.user = this.chatService.user;
        this.userForm = new FormGroup({
            mood  : new FormControl(this.user.mood),
            status: new FormControl(this.user.status)
        });
    }

    ngOnInit()
    {
        this.onFormChange = this.userForm.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(data => {
            this.user.mood = data.mood;
            this.user.status = data.status;
            this.chatService.updateUserData(this.user);
        });
    }

    changeLeftSidenavView(view)
    {
        this.chatService.onLeftSidenavViewChanged.next(view);
    }

    ngOnDestroy()
    {
        this.onFormChange.unsubscribe();
    }
}
