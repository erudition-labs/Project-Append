import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';

import { merge, Observable, BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { EcommerceOrdersService } from './orders.service';

@Component({
    selector   : 'fuse-e-commerce-orders',
    templateUrl: './orders.component.html',
    styleUrls  : ['./orders.component.scss'],
    animations : fuseAnimations
})
export class FuseEcommerceOrdersComponent implements OnInit
{
    dataSource: FilesDataSource | null;
    displayedColumns = ['id', 'reference', 'customer', 'total', 'payment', 'status', 'date'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('filter') filter: ElementRef;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private ordersService: EcommerceOrdersService
    )
    {
    }

    ngOnInit()
    {
        this.dataSource = new FilesDataSource(this.ordersService, this.paginator, this.sort);

        fromEvent(this.filter.nativeElement, 'keyup').pipe(
            debounceTime(150),
            distinctUntilChanged()
        ).subscribe(() => {
            if ( !this.dataSource )
            {
                return;
            }
            this.dataSource.filter = this.filter.nativeElement.value;
        });
    }
}

export class FilesDataSource extends DataSource<any>
{
    _filterChange = new BehaviorSubject('');
    _filteredDataChange = new BehaviorSubject('');

    get filteredData(): any
    {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any)
    {
        this._filteredDataChange.next(value);
    }

    get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }

    constructor(
        private ordersService: EcommerceOrdersService,
        private _paginator: MatPaginator,
        private _sort: MatSort
    )
    {
        super();
        this.filteredData = this.ordersService.orders;
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this.ordersService.onOrdersChanged,
            this._paginator.page,
            this._filterChange,
            this._sort.sortChange
        ];

        return merge(...displayDataChanges).pipe(map(() => {

                let data = this.ordersService.orders.slice();

                data = this.filterData(data);

                this.filteredData = [...data];

                data = this.sortData(data);

                // Grab the page's slice of data.
                const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
                return data.splice(startIndex, this._paginator.pageSize);
            })
        );

    }

    filterData(data)
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    sortData(data): any[]
    {
        if ( !this._sort.active || this._sort.direction === '' )
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch ( this._sort.active )
            {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'reference':
                    [propertyA, propertyB] = [a.reference, b.reference];
                    break;
                case 'customer':
                    [propertyA, propertyB] = [a.customer.firstName, b.customer.firstName];
                    break;
                case 'total':
                    [propertyA, propertyB] = [a.total, b.total];
                    break;
                case 'payment':
                    [propertyA, propertyB] = [a.payment.method, b.payment.method];
                    break;
                case 'status':
                    [propertyA, propertyB] = [a.status[0].name, b.status[0].name];
                    break;
                case 'date':
                    [propertyA, propertyB] = [a.date, b.date];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }

    disconnect()
    {
    }
}
