import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class KnowledgeBaseService implements Resolve<any>
{
    knowledgeBase: any;
    onKnowledgeBaseChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private http: HttpClient)
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
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getKnowledgeBase()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get knowledge base
     */
    getKnowledgeBase(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this.http.get('api/knowledge-base')
                .subscribe((response: any) => {
                    this.knowledgeBase = response;
                    this.onKnowledgeBaseChanged.next(this.knowledgeBase);
                    resolve(this.knowledgeBase);
                }, reject);
        });
    }
}
