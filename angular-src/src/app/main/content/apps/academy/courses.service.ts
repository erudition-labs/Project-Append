import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AcademyCoursesService implements Resolve<any>
{
    onCategoriesChanged: BehaviorSubject<any> = new BehaviorSubject({});
    onCoursesChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private http: HttpClient)
    {
    }

    /**
     * The Academy App Main Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getCategories(),
                this.getCourses()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getCategories(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get('api/academy-categories')
                .subscribe((response: any) => {
                    this.onCategoriesChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

    getCourses(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get('api/academy-courses')
                .subscribe((response: any) => {
                    this.onCoursesChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

}
