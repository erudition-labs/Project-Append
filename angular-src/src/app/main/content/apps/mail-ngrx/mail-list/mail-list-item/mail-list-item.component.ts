import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MailNgrxService } from '../../mail.service';
import { Mail } from '../../mail.model';
import * as fromStore from '../../store';

@Component({
    selector       : 'fuse-mail-list-item',
    templateUrl    : './mail-list-item.component.html',
    styleUrls      : ['./mail-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseMailNgrxListItemComponent implements OnInit
{
    @Input() mail: Mail;
    @HostBinding('class.selected') selected: boolean;
    @HostBinding('class.unread') unread: boolean;
    labels$: Observable<any>;
    selectedMailIds$: Observable<any>;

    constructor(
        private mailService: MailNgrxService,
        private store: Store<fromStore.MailAppState>,
        private cd: ChangeDetectorRef
    )
    {
        this.labels$ = this.store.select(fromStore.getLabelsArr);
        this.selectedMailIds$ = this.store.select(fromStore.getSelectedMailIds);
        this.selected = false;
    }

    ngOnInit()
    {
        // Set the initial values
        this.mail = new Mail(this.mail);
        this.unread = !this.mail.read;

        this.selectedMailIds$.subscribe((selectedMailIds) => {
            this.selected = selectedMailIds.length > 0 && selectedMailIds.find(id => id === this.mail.id) !== undefined;
            this.refresh();
        });
    }

    refresh()
    {
        this.cd.markForCheck();
    }

    onSelectedChange()
    {
        this.store.dispatch(new fromStore.ToggleInSelectedMails(this.mail.id));
    }
}
