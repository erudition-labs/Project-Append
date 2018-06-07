import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class CalendarService implements Resolve<any>
{
    events: any;
    onEventsUpdated = new Subject<any>();

    constructor(private http: HttpClient)
    {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getEvents()
            ]).then(
                ([events]: [any]) => {
                    resolve();
                },
                reject
            );
        });
    }

    getEvents()
    {
        return new Promise((resolve, reject) => {

            this.http.get('api/calendar/events')
                .subscribe((response: any) => {
                    this.events = response.data;
                    this.onEventsUpdated.next(this.events);
                    resolve(this.events);
                }, reject);
        });
    }

    updateEvents(events)
    {
        return new Promise((resolve, reject) => {
            this.http.post('api/calendar/events', {
                id  : 'events',
                data: [...events]
            })
                .subscribe((response: any) => {
                    this.getEvents();
                }, reject);
        });
    }

}
