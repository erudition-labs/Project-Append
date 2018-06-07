import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';

import { merge, Observable, BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { EcommerceProductsService } from './products.service';

@Component({
    selector   : 'fuse-e-commerce-products',
    templateUrl: './products.component.html',
    styleUrls  : ['./products.component.scss'],
    animations : fuseAnimations
})
export class FuseEcommerceProductsComponent implements OnInit
{
    dataSource: FilesDataSource | null;
    displayedColumns = ['id', 'image', 'name', 'category', 'price', 'quantity', 'active'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('filter') filter: ElementRef;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private productsService: EcommerceProductsService
    )
    {
    }

    ngOnInit()
    {
        this.dataSource = new FilesDataSource(this.productsService, this.paginator, this.sort);

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
        private productsService: EcommerceProductsService,
        private _paginator: MatPaginator,
        private _sort: MatSort
    )
    {
        super();
        this.filteredData = this.productsService.products;
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this.productsService.onProductsChanged,
            this._paginator.page,
            this._filterChange,
            this._sort.sortChange
        ];

        return merge(...displayDataChanges).pipe(map(() => {

                let data = this.productsService.products.slice();

                data = this.filterData(data);

                this.filteredData = [...data];

                data = this.sortData(data);

                // Grab the page's slice of data.
                const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
                return data.splice(startIndex, this._paginator.pageSize);
            }
        ));
    }

    filterData(data)
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    sortData(data)
        :
        any[]
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
                case 'name':
                    [propertyA, propertyB] = [a.name, b.name];
                    break;
                case 'categories':
                    [propertyA, propertyB] = [a.categories[0], b.categories[0]];
                    break;
                case 'price':
                    [propertyA, propertyB] = [a.priceTaxIncl, b.priceTaxIncl];
                    break;
                case 'quantity':
                    [propertyA, propertyB] = [a.quantity, b.quantity];
                    break;
                case 'active':
                    [propertyA, propertyB] = [a.active, b.active];
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
