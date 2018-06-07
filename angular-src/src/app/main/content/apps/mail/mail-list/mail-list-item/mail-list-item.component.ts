import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Mail } from '../../mail.model';
import { MailService } from '../../mail.service';

@Component({
    selector   : 'fuse-mail-list-item',
    templateUrl: './mail-list-item.component.html',
    styleUrls  : ['./mail-list-item.component.scss']
})
export class FuseMailListItemComponent implements OnInit, OnDestroy
{
    @Input() mail: Mail;
    labels: any[];
    @HostBinding('class.selected') selected: boolean;

    onSelectedMailsChanged: Subscription;
    onLabelsChanged: Subscription;

    constructor(
        private mailService: MailService
    )
    {
    }

    ngOnInit()
    {
        // Set the initial values
        this.mail = new Mail(this.mail);

        // Subscribe to update on selected mail change
        this.onSelectedMailsChanged =
            this.mailService.onSelectedMailsChanged
                .subscribe(selectedMails => {
                    this.selected = false;

                    if ( selectedMails.length > 0 )
                    {
                        for ( const mail of selectedMails )
                        {
                            if ( mail.id === this.mail.id )
                            {
                                this.selected = true;
                                break;
                            }
                        }
                    }
                });

        // Subscribe to update on label change
        this.onLabelsChanged =
            this.mailService.onLabelsChanged
                .subscribe(labels => {
                    this.labels = labels;
                });
    }

    ngOnDestroy()
    {
        this.onSelectedMailsChanged.unsubscribe();
    }

    onSelectedChange()
    {
        this.mailService.toggleSelectedMail(this.mail.id);
    }

    /**
     * Toggle star
     * @param event
     */
    toggleStar(event)
    {
        event.stopPropagation();

        this.mail.toggleStar();

        this.mailService.updateMail(this.mail);
    }

    /**
     * Toggle Important
     * @param event
     */
    toggleImportant(event)
    {
        event.stopPropagation();

        this.mail.toggleImportant();

        this.mailService.updateMail(this.mail);
    }
}
