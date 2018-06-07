import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Mail } from '../mail.model';
import { MailNgrxService } from '../mail.service';

@Component({
    selector       : 'fuse-mail-list',
    templateUrl    : './mail-list.component.html',
    styleUrls      : ['./mail-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseMailNgrxListComponent
{
    @Input() mails: Mail[];
    @Input() currentMail: Mail[];

    constructor(
        private route: ActivatedRoute,
        private mailService: MailNgrxService,
        private router: Router
    )
    {
    }

    /**
     * Read mail
     * @param mailId
     */
    readMail(mailId)
    {
        const labelHandle  = this.route.snapshot.params.labelHandle,
              filterHandle = this.route.snapshot.params.filterHandle,
              folderHandle = this.route.snapshot.params.folderHandle;

        if ( labelHandle )
        {
            this.router.navigate(['apps/mail-ngrx/label/' + labelHandle + '/' + mailId]);
        }
        else if ( filterHandle )
        {
            this.router.navigate(['apps/mail-ngrx/filter/' + filterHandle + '/' + mailId]);
        }
        else
        {
            this.router.navigate(['apps/mail-ngrx/' + folderHandle + '/' + mailId]);
        }
    }
}
