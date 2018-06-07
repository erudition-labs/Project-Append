import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { Mail } from './mail.model';
import { MailService } from './mail.service';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

@Component({
    selector   : 'fuse-mail',
    templateUrl: './mail.component.html',
    styleUrls  : ['./mail.component.scss']
})
export class FuseMailComponent implements OnInit, OnDestroy
{
    hasSelectedMails: boolean;
    isIndeterminate: boolean;
    folders: any[];
    filters: any[];
    labels: any[];
    searchInput: FormControl;
    currentMail: Mail;

    onSelectedMailsChanged: Subscription;
    onFoldersChanged: Subscription;
    onFiltersChanged: Subscription;
    onLabelsChanged: Subscription;
    onCurrentMailChanged: Subscription;

    constructor(
        private mailService: MailService,
        private fuseTranslationLoader: FuseTranslationLoaderService
    )
    {
        this.searchInput = new FormControl('');
        this.fuseTranslationLoader.loadTranslations(english, turkish);
    }

    ngOnInit()
    {
        this.onSelectedMailsChanged =
            this.mailService.onSelectedMailsChanged
                .subscribe(selectedMails => {

                    setTimeout(() => {
                        this.hasSelectedMails = selectedMails.length > 0;
                        this.isIndeterminate = (selectedMails.length !== this.mailService.mails.length && selectedMails.length > 0);
                    }, 0);
                });

        this.onFoldersChanged =
            this.mailService.onFoldersChanged
                .subscribe(folders => {
                    this.folders = this.mailService.folders;
                });

        this.onFiltersChanged =
            this.mailService.onFiltersChanged
                .subscribe(folders => {
                    this.filters = this.mailService.filters;
                });

        this.onLabelsChanged =
            this.mailService.onLabelsChanged
                .subscribe(labels => {
                    this.labels = this.mailService.labels;
                });

        this.onCurrentMailChanged =
            this.mailService.onCurrentMailChanged
                .subscribe(currentMail => {
                    if ( !currentMail )
                    {
                        this.currentMail = null;
                    }
                    else
                    {
                        this.currentMail = currentMail;
                    }
                });

        this.searchInput.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged()
        )
            .subscribe(searchText => {
                this.mailService.onSearchTextChanged.next(searchText);
            });
    }

    ngOnDestroy()
    {
        this.onSelectedMailsChanged.unsubscribe();
        this.onFoldersChanged.unsubscribe();
        this.onFiltersChanged.unsubscribe();
        this.onLabelsChanged.unsubscribe();
        this.onCurrentMailChanged.unsubscribe();

    }

    toggleSelectAll()
    {
        this.mailService.toggleSelectAll();
    }

    selectMails(filterParameter?, filterValue?)
    {
        this.mailService.selectMails(filterParameter, filterValue);
    }

    deselectMails()
    {
        this.mailService.deselectMails();
    }

    deSelectCurrentMail()
    {
        this.mailService.onCurrentMailChanged.next(null);
    }

    toggleLabelOnSelectedMails(labelId)
    {
        this.mailService.toggleLabelOnSelectedMails(labelId);
    }

    setFolderOnSelectedMails(folderId)
    {
        this.mailService.setFolderOnSelectedMails(folderId);
    }
}
