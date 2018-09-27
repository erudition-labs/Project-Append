import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SearchService } from 'app/main/pages/search/search.service';

@Component({
    selector   : 'search-classic',
    templateUrl: './classic.component.html',
    styleUrls  : ['./classic.component.scss']
})
export class SearchClassicComponent implements OnInit, OnDestroy
{
    classic: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {SearchService} _searchService
     */
    constructor(
        private _searchService: SearchService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._searchService.classicOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(classic => {
                this.classic = classic;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
