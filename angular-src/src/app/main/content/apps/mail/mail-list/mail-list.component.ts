import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { Mail } from '../mail.model';
import { MailService } from '../mail.service';

@Component({
    selector   : 'fuse-mail-list',
    templateUrl: './mail-list.component.html',
    styleUrls  : ['./mail-list.component.scss'],
    animations : fuseAnimations
})
export class FuseMailListComponent implements OnInit, OnDestroy
{
    mails: Mail[];
    currentMail: Mail;

    onMailsChanged: Subscription;
    onCurrentMailChanged: Subscription;

    constructor(
        private route: ActivatedRoute,
        private mailService: MailService,
        private location: Location
    )
    {
    }

    ngOnInit()
    {
        // Subscribe to update mails on changes
        this.onMailsChanged =
            this.mailService.onMailsChanged
                .subscribe(mails => {
                    this.mails = mails;
                });

        // Subscribe to update current mail on changes
        this.onCurrentMailChanged =
            this.mailService.onCurrentMailChanged
                .subscribe(currentMail => {
                    if ( !currentMail )
                    {
                        // Set the current mail id to null to deselect the current mail
                        this.currentMail = null;

                        // Handle the location changes
                        const labelHandle  = this.route.snapshot.params.labelHandle,
                              filterHandle = this.route.snapshot.params.filterHandle,
                              folderHandle = this.route.snapshot.params.folderHandle;

                        if ( labelHandle )
                        {
                            this.location.go('apps/mail/label/' + labelHandle);
                        }
                        else if ( filterHandle )
                        {
                            this.location.go('apps/mail/filter/' + filterHandle);
                        }
                        else
                        {
                            this.location.go('apps/mail/' + folderHandle);
                        }
                    }
                    else
                    {
                        this.currentMail = currentMail;
                    }
                });
    }

    ngOnDestroy()
    {
        this.onMailsChanged.unsubscribe();
        this.onCurrentMailChanged.unsubscribe();
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
            this.location.go('apps/mail/label/' + labelHandle + '/' + mailId);
        }
        else if ( filterHandle )
        {
            this.location.go('apps/mail/filter/' + filterHandle + '/' + mailId);
        }
        else
        {
            this.location.go('apps/mail/' + folderHandle + '/' + mailId);
        }

        // Set current mail
        this.mailService.setCurrentMail(mailId);
    }

}
