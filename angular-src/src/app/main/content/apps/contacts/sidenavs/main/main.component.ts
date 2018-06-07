import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ContactsService } from '../../contacts.service';

@Component({
    selector   : 'fuse-contacts-main-sidenav',
    templateUrl: './main.component.html',
    styleUrls  : ['./main.component.scss']
})
export class FuseContactsMainSidenavComponent implements OnDestroy
{
    user: any;
    filterBy: string;
    
    onUserDataChangedSubscription: Subscription;

    constructor(private contactsService: ContactsService)
    {
        this.filterBy = this.contactsService.filterBy || 'all';
        this.onUserDataChangedSubscription =
            this.contactsService.onUserDataChanged.subscribe(user => {
                this.user = user;
            });
    }

    changeFilter(filter)
    {
        this.filterBy = filter;
        this.contactsService.onFilterChanged.next(this.filterBy);
    }

    ngOnDestroy()
    {
        this.onUserDataChangedSubscription.unsubscribe();
    }
}
