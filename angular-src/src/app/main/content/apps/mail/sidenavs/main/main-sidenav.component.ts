import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { MailService } from '../../mail.service';
import { FuseMailComposeDialogComponent } from '../../dialogs/compose/compose.component';

@Component({
    selector   : 'fuse-mail-main-sidenav',
    templateUrl: './main-sidenav.component.html',
    styleUrls  : ['./main-sidenav.component.scss'],
    animations : fuseAnimations
})
export class FuseMailMainSidenavComponent implements OnInit, OnDestroy
{
    folders: any[];
    filters: any[];
    labels: any[];
    accounts: object;
    selectedAccount: string;
    dialogRef: any;

    onFoldersChanged: Subscription;
    onFiltersChanged: Subscription;
    onLabelsChanged: Subscription;

    constructor(
        private mailService: MailService,
        public dialog: MatDialog
    )
    {
        // Data
        this.accounts = {
            'creapond'    : 'johndoe@creapond.com',
            'withinpixels': 'johndoe@withinpixels.com'
        };

        this.selectedAccount = 'creapond';
    }

    ngOnInit()
    {
        this.onFoldersChanged =
            this.mailService.onFoldersChanged
                .subscribe(folders => {
                    this.folders = folders;
                });

        this.onFiltersChanged =
            this.mailService.onFiltersChanged
                .subscribe(filters => {
                    this.filters = filters;
                });

        this.onLabelsChanged =
            this.mailService.onLabelsChanged
                .subscribe(labels => {
                    this.labels = labels;
                });
    }

    ngOnDestroy()
    {
        this.onFoldersChanged.unsubscribe();
        this.onFiltersChanged.unsubscribe();
        this.onLabelsChanged.unsubscribe();
    }
    
    composeDialog()
    {
        this.dialogRef = this.dialog.open(FuseMailComposeDialogComponent, {
            panelClass: 'mail-compose-dialog'
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    /**
                     * Send
                     */
                    case 'send':
                        console.log('new Mail', formData.getRawValue());
                        break;
                    /**
                     * Delete
                     */
                    case 'delete':
                        console.log('delete Mail');
                        break;
                }
            });
    }
}
