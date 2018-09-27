import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SearchService implements Resolve<any>
{
    classic: any;
    table: any;

    classicOnChanged: BehaviorSubject<any>;
    tableOnChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.classicOnChanged = new BehaviorSubject({});
        this.tableOnChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getClassic(),
                this.getTable()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get classic
     */
    getClassic(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/search-classic')
                .subscribe((classic: any) => {
                    this.classic = classic;
                    this.classicOnChanged.next(this.classic);
                    resolve(this.classic);
                }, reject);
        });
    }

    /**
     * Get table
     */
    getTable(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/search-table')
                .subscribe((table: any) => {
                    this.table = table;
                    this.tableOnChanged.next(this.table);
                    resolve(this.table);
                }, reject);
        });
    }
}
