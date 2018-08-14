import { Injectable             } from '@angular/core';
import { Http, Headers          } from '@angular/http';
import { Observable             } from 'rxjs';
import { BehaviorSubject        } from 'rxjs/BehaviorSubject';
import { map                    } from 'rxjs/operators';
import 'rxjs/add/operator/map';

export interface Station {
    _id             : string,
    name            : string,
    controlBoxId    : string,
    controllerId    : string,
    stationId       : string,
    isAssigned      : boolean,
    lat             : string,
    long            : string,
    overlap         : string,
    runTime         : string
}

export interface Controller {
    _id             : string,
    controllerId    : string,
    stations        : Station[]
}

export interface ControlBox {
    _id         : string,
    ip          : string,
    controlBoxId: string,
    longitude   : string,
    latitude    : string,
    controllers : Controller[]
}

@Injectable()
export class ControlBoxService {
    stations                    : Observable<Station[]>;
    private allstations         : BehaviorSubject<Station[]>;
    private dataStore           : { stations : Station[] };

    constructor(private http : Http, ) {
        this.dataStore  = { stations : [] };
        this.allstations  = <BehaviorSubject<Station[]>>new BehaviorSubject([]);
        this.stations     = this.allstations.asObservable();
    }


    loadAllStations() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get('http://localhost:3000/data/stations', {headers: headers})
        .subscribe(data => {
            this.dataStore.stations = data.json();
            this.allstations.next(Object.assign({}, this.dataStore).stations);
        }, error => console.log('Could not Load Stations'));
    }


    //We dont really do this stuff in the fron end, but just in case, its here
/*
    create(controlBox : ControlBox) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post('http://localhost:3000/data/controlBox', controlBox, {headers: headers})
        .subscribe(data => {
            this.dataStore.controlBoxes.push(data.json());
            this.allControlBoxes.next(Object.assign({}, this.dataStore).controlBoxes);
        }, error => console.log('well shit'));
    }

    update(box : ControlBox) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        this.http.put('http://localhost:3000/data/controlBox/:id'+box._id, box)
        .subscribe(data => {
            this.dataStore.controlBoxes.forEach((issue, i) => {
                if(issue._id === data.json()._id) { this.dataStore.controlBoxes[i] = data.json(); }
            });
            this.allControlBoxes.next(Object.assign({}, this.dataStore).controlBoxes);
        }, error => console.log('Could not update!'));
    }

    remove(boxId : string) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        this.http.delete('http://localhost:3000/data/controlBox/:id'+boxId)
        .subscribe(response => {
            this.dataStore.controlBoxes.forEach((issue, i) => {
                if(issue._id === issueId) { this.dataStore.controlBoxes.splice(i, 1); }
            });
            this.allControlBoxes.next(Object.assign({}, this.dataStore).controlBoxes);
        }, error => console.log('could not remove'));
    }*/
}
