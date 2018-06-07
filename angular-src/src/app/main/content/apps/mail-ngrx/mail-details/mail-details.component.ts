import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Mail } from '../mail.model';
import * as fromStore from '../store';
import { MailNgrxService } from '../mail.service';

@Component({
    selector       : 'fuse-mail-details',
    templateUrl    : './mail-details.component.html',
    styleUrls      : ['./mail-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseMailNgrxDetailsComponent implements OnChanges
{
    labels$: Observable<any>;
    @Input('mail') mailInput: Mail;
    mail: Mail;
    showDetails = false;

    constructor(
        private mailService: MailNgrxService,
        private store: Store<fromStore.MailAppState>
    )
    {
        this.labels$ = this.store.select(fromStore.getLabelsArr);
    }

    ngOnChanges()
    {
        this.updateModel(this.mailInput);
        this.markAsRead();
    }

    markAsRead()
    {
        if ( this.mail && !this.mail.read )
        {
            this.mail.markRead();
            this.updateMail();
        }
    }

    toggleStar(event)
    {
        event.stopPropagation();
        this.mail.toggleStar();
        this.updateMail();
    }

    toggleImportant(event)
    {
        event.stopPropagation();
        this.mail.toggleImportant();
        this.updateMail();
    }

    updateModel(data)
    {
        this.mail = !data ? null : new Mail({...data});
    }

    updateMail()
    {
        this.store.dispatch(new fromStore.UpdateMail(this.mail));
        this.updateModel(this.mail);
    }
}
