import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MailNgrxService } from '../../mail.service';
import * as fromStore from './../../store';
import { FuseMailNgrxComposeDialogComponent } from '../../dialogs/compose/compose.component';

@Component({
    selector       : 'fuse-mail-main-sidenav',
    templateUrl    : './main-sidenav.component.html',
    styleUrls      : ['./main-sidenav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseMailNgrxMainSidenavComponent
{
    labels: any[];
    accounts: object;
    selectedAccount: string;
    dialogRef: any;

    folders$: Observable<any>;
    filters$: Observable<any>;
    labels$: Observable<any>;

    constructor(
        private mailService: MailNgrxService,
        public dialog: MatDialog,
        private store: Store<fromStore.MailAppState>
    )
    {
        // Data
        this.accounts = {
            'creapond'    : 'johndoe@creapond.com',
            'withinpixels': 'johndoe@withinpixels.com'
        };

        this.selectedAccount = 'creapond';

        this.folders$ = this.store.select(fromStore.getFoldersArr);
        this.filters$ = this.store.select(fromStore.getFiltersArr);
        this.labels$ = this.store.select(fromStore.getLabelsArr);
    }

    composeDialog()
    {
        this.dialogRef = this.dialog.open(FuseMailNgrxComposeDialogComponent, {
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
