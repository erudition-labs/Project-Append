import { Injectable             } from '@angular/core';
import { Http, Headers          } from '@angular/http';
import { Observable             } from 'rxjs';
import { BehaviorSubject        } from 'rxjs/BehaviorSubject';
import { map                    } from 'rxjs/operators';
import 'rxjs/add/operator/map';

export interface Issue {
    _id             : string;
    name            : string;
    severity        : string;
    dateCreated     : string;
    dateCompleted   : string;
    controlBox      : string;
    controller      : string;
    zone            : string;
    station         : string;
    description     : string;
    assignedUser    : string;
}


@Injectable()
export class LogService {

    issues              : Observable<Issue[]>;
    private issueLogs   : BehaviorSubject<Issue[]>;
    private dataStore   : { issues : Issue[] };

    constructor(private http : Http, ) {
        this.dataStore  = { issues : [] };
        this.issueLogs  = <BehaviorSubject<Issue[]>>new BehaviorSubject([]);
        this.issues     = this.issueLogs.asObservable();
    }


    loadAll() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get('http://localhost:3000/issueLogs/issueList', {headers: headers})
        .subscribe(data => {
            this.dataStore.issues = data.json();
            this.issueLogs.next(Object.assign({}, this.dataStore).issues);
        }, error => console.log('Could not Load logs'));
    }

    create(issue : Issue) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post('http://localhost:3000/issueLogs/issue', issue, {headers: headers})
        .subscribe(data => {
            this.dataStore.issues.push(data.json());
            this.issueLogs.next(Object.assign({}, this.dataStore).issues);
        }, error => console.log('well shit'));
    }

    update(issue : Issue) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        this.http.put('http://localhost:3000/issueLogs/issue/'+issue._id, issue)
        .subscribe(data => {
            this.dataStore.issues.forEach((issue, i) => {
                if(issue._id === data.json()._id) { this.dataStore.issues[i] = data.json(); }
            });
            this.issueLogs.next(Object.assign({}, this.dataStore).issues);
        }, error => console.log('Could not update!'));
    }

    remove(issueId : string) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        this.http.delete('http://localhost:3000/issueLogs/issue/'+issueId)
        .subscribe(response => {
            this.dataStore.issues.forEach((issue, i) => {
                if(issue._id === issueId) { this.dataStore.issues.splice(i, 1); }
            });
            this.issueLogs.next(Object.assign({}, this.dataStore).issues);
        }, error => console.log('could not remove'));
    }
}
