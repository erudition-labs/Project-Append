import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class EcommerceOrderService implements Resolve<any>
{
    routeParams: any;
    order: any;
    onOrderChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(
        private http: HttpClient
    )
    {
    }

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {

        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getOrder()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getOrder(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get('api/e-commerce-orders/' + this.routeParams.id)
                .subscribe((response: any) => {
                    this.order = response;
                    this.onOrderChanged.next(this.order);
                    resolve(response);
                }, reject);
        });
    }

    saveOrder(order)
    {
        return new Promise((resolve, reject) => {
            this.http.post('api/e-commerce-orders/' + order.id, order)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    addOrder(order)
    {
        return new Promise((resolve, reject) => {
            this.http.post('api/e-commerce-orders/', order)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
