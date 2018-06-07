import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Mail } from './mail.model';
import { MailAppState } from './store/reducers';
import { getFiltersArr, getFoldersArr, getLabelsArr, getMailsArr } from './store/selectors';

@Injectable()
export class MailNgrxService
{
    foldersArr: any;
    filtersArr: any;
    labelsArr: any;
    selectedMails: Mail[];
    mails: Mail[];

    constructor(
        private http: HttpClient,
        private store: Store<MailAppState>
    )
    {
        this.store.select(getFoldersArr).subscribe(folders => {
            this.foldersArr = folders;
        });
        this.store.select(getFiltersArr).subscribe(filters => {
            this.filtersArr = filters;
        });
        this.store.select(getLabelsArr).subscribe(labels => {
            this.labelsArr = labels;
        });
        this.store.select(getMailsArr).subscribe(mails => {
            this.mails = mails;
        });

        this.selectedMails = [];
    }

    getAllMails(): Observable<Mail[]>
    {
        return this.http.get<Mail[]>('api/mail-mails');
    }

    getFolders(): Observable<any>
    {
        return this.http.get('api/mail-folders');
    }

    getFilters(): Observable<any>
    {
        return this.http.get('api/mail-filters');
    }

    getLabels(): Observable<any>
    {
        return this.http.get('api/mail-labels');
    }

    getMails(handle): Observable<Mail[]>
    {
        if ( handle.id === 'labelHandle' )
        {
            const labelId = this.labelsArr.find(label => label.handle === handle.value).id;
            return this.http.get<Mail[]>('api/mail-mails?labels=' + labelId);
        }
        else if ( handle.id === 'filterHandle' )
        {
            return this.http.get<Mail[]>('api/mail-mails?' + handle.value + '=true');
        }
        else // folderHandle
        {
            const folderId = this.foldersArr.find(folder => folder.handle === handle.value).id;
            return this.http.get<any>('api/mail-mails?folder=' + folderId);
        }
    }

    /**
     * Update the mail
     * @param mail
     * @returns {Promise<any>}
     */
    updateMail(mail)
    {
        return this.http.post('api/mail-mails/' + mail.id, {...mail});
    }
}
