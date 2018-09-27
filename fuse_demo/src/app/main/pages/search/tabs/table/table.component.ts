import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';

import { SearchService } from 'app/main/pages/search/search.service';

@Component({
    selector   : 'search-table',
    templateUrl: './table.component.html',
    styleUrls  : ['./table.component.scss']
})
export class SearchTableComponent implements OnInit, OnDestroy
{
    table: any;
    dataSource: SearchTableDataSource;
    displayedColumns: string[];

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
        // Set the defaults
        this.displayedColumns = ['name', 'position', 'office', 'salary'];

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
        this.dataSource = new SearchTableDataSource(this._searchService);

        this._searchService.tableOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(table => {
                this.table = table;
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

export class SearchTableDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {SearchService} _searchService
     */
    constructor(
        private _searchService: SearchService
    )
    {
        super();
    }

    /**
     * Connect
     *
     * @returns {BehaviorSubject<any>}
     */
    connect(): BehaviorSubject<any>
    {
        return this._searchService.tableOnChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {

    }
}
