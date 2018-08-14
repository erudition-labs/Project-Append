import { Injectable             } from '@angular/core';
import { Http, Headers          } from '@angular/http';
import { Observable             } from 'rxjs';
import { BehaviorSubject        } from 'rxjs/BehaviorSubject';
import { map                    } from 'rxjs/operators';
import { AuthService            } from './auth.service';
import 'rxjs/add/operator/map';

export interface User {
    _id         : string;
    email       : string;
    access      : string;
    username    : string;
    password    : string;
}

@Injectable()
export class UsersService {
    users               : Observable<User[]>;
    private allUsers    : BehaviorSubject<User[]>;
    private dataStore   : { users : User[] };

    constructor(private http : Http)
    {
        this.dataStore  = { users : [] };
        this.allUsers   = <BehaviorSubject<User[]>> new BehaviorSubject([]);
        this.users      = this.allUsers.asObservable();
    }

    loadAll() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get('http://localhost:3000/users/usersList', {headers: headers})
        .subscribe(data => {
            this.dataStore.users = data.json();
            this.allUsers.next(Object.assign({}, this.dataStore).users);
        }, error => console.log(error));
    }

    create(user : User) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post('http://localhost/3000/users/register', user, {headers: headers})
        .subscribe(data => {
            this.dataStore.users.push(data.json());
            this.allUsers.next(Object.assign({}, this.dataStore).users);
        }, error => console.log(error));
    }
    /*
    update(user : User) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.put('http://localhost:3000/users/useri/'+user._id, user)
    .subscribe(data => {
    this.dataStore.users.forEach((user, i) => {
    if(user._id === data.json()._id) { this.dataStore.users[i] = data.json(); }
});
this.allUsers.next(Object.assign({}, this.dataStore).users);
} error => console.log(error));
}*/

    remove(userId : string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.delete('http://localhost:3000/users/user/'+userId)
        .subscribe(response => {
            this.dataStore.users.forEach((user, i) => {
                if(user._id === userId) { this.dataStore.users.splice(i, 1); }
            });
            this.allUsers.next(Object.assign({}, this.dataStore).users);
        }, error => console.log(error));
    }
}
