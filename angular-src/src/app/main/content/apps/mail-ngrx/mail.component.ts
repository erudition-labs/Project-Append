import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';

import { MailNgrxService } from './mail.service';
import { Mail } from './mail.model';
import * as fromStore from './store';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

@Component({
    selector       : 'fuse-mail',
    templateUrl    : './mail.component.html',
    styleUrls      : ['./mail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseMailNgrxComponent implements OnInit, OnDestroy
{
    hasSelectedMails: boolean;
    isIndeterminate: boolean;
    searchInput: FormControl;
    mails$: Observable<any>;
    folders$: Observable<any>;
    labels$: Observable<any>;
    currentMail$: Observable<Mail>;
    selectedMailIds$: Observable<string[]>;
    searchText$: Observable<string>;
    mails: Mail[];
    selectedMailIds: string[];

    constructor(
        private configService: FuseConfigService,
        private mailService: MailNgrxService,
        private translationLoader: FuseTranslationLoaderService,
        private store: Store<fromStore.MailAppState>,
        private cd: ChangeDetectorRef
    )
    {
        this.searchInput = new FormControl('');
        this.translationLoader.loadTranslations(english, turkish);
        this.currentMail$ = this.store.select(fromStore.getCurrentMail);
        this.mails$ = this.store.select(fromStore.getMailsArr);
        this.folders$ = this.store.select(fromStore.getFoldersArr);
        this.labels$ = this.store.select(fromStore.getLabelsArr);
        this.selectedMailIds$ = this.store.select(fromStore.getSelectedMailIds);
        this.searchText$ = this.store.select(fromStore.getSearchText);
        this.mails = [];
        this.selectedMailIds = [];

        this.configService.setConfig({
            routerAnimation: 'none'
        });
    }

    ngOnInit()
    {
        this.mails$.subscribe(mails => {
            this.mails = mails;
        });

        this.selectedMailIds$
            .subscribe(selectedMailIds => {
                this.selectedMailIds = selectedMailIds;
                this.hasSelectedMails = selectedMailIds.length > 0;
                this.isIndeterminate = (selectedMailIds.length !== this.mails.length && selectedMailIds.length > 0);
                this.refresh();
            });

        this.searchText$.subscribe(searchText => {
            this.searchInput.setValue(searchText);
        });

        this.searchInput.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe(searchText => {
            this.store.dispatch(new fromStore.SetSearchText(searchText));
        });
    }

    ngOnDestroy()
    {
        this.cd.detach();
    }

    toggleSelectAll(ev)
    {
        ev.preventDefault();

        if ( this.selectedMailIds.length && this.selectedMailIds.length > 0 )
        {
            this.deselectAllMails();
        }
        else
        {
            this.selectAllMails();
        }
    }

    selectAllMails()
    {
        this.store.dispatch(new fromStore.SelectAllMails());
    }

    deselectAllMails()
    {
        this.store.dispatch(new fromStore.DeselectAllMails());
    }

    selectMailsByParameter(parameter, value)
    {
        this.store.dispatch(new fromStore.SelectMailsByParameter({
            parameter,
            value
        }));
    }

    toggleLabelOnSelectedMails(labelId)
    {
        this.store.dispatch(new fromStore.AddLabelOnSelectedMails(labelId));
    }

    setFolderOnSelectedMails(folderId)
    {
        this.store.dispatch(new fromStore.SetFolderOnSelectedMails(folderId));
    }

    deSelectCurrentMail()
    {
        this.store.dispatch(new fromStore.SetCurrentMail(''));
    }

    refresh()
    {
        this.cd.markForCheck();
    }
}
