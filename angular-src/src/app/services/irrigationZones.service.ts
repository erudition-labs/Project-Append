import { Injectable             } from '@angular/core';
import { Http, Headers          } from '@angular/http';
import { Observable             } from 'rxjs';
import { BehaviorSubject        } from 'rxjs/BehaviorSubject';
import { map                    } from 'rxjs/operators';
import { Station               } from './controlBoxes.service'

import 'rxjs/add/operator/map';


export interface Schedule {
    _id         ?: string,
    name        : string,
    startTime   : string,
    cycle       : string,
    cycleLength : Number,
    stations    : Station[]
}

export interface IrrigationZone {
    _id         ?: string,
    name        : string,
    description : string,
    picture     ?: string,
    stations    : Station[],
    schedules   ?: Schedule[]
}

@Injectable()
export class IrrigationZoneService {

    irrigationZones              : Observable<IrrigationZone[]>;
    private allIrrigationZones   : BehaviorSubject<IrrigationZone[]>;
    private dataStore            : { irrigationZones : IrrigationZone[] };

    constructor(private http : Http, ) {
        this.dataStore           = { irrigationZones : [] };
        this.allIrrigationZones  = <BehaviorSubject<IrrigationZone[]>>new BehaviorSubject([]);
        this.irrigationZones     = this.allIrrigationZones.asObservable();
    }


    loadAll() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get('http://localhost:3000/zones/zoneList', {headers: headers})
        .subscribe(data => {
            this.dataStore.irrigationZones = data.json();
            this.allIrrigationZones.next(Object.assign({}, this.dataStore).irrigationZones);
        }, error => console.log('Could not Irrigation Zones'));
    }

    create(zone : IrrigationZone) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post('http://localhost:3000/zones/zone', zone, {headers: headers})
        .subscribe(data => {
            this.dataStore.irrigationZones.push(data.json());
            this.allIrrigationZones.next(Object.assign({}, this.dataStore).irrigationZones);
        }, error => console.log('Could not create Irrigation Zone'));
    }

    update(zone : IrrigationZone) {
        console.log(zone);
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        this.http.put('http://localhost:3000/zones/zone/'+zone._id,zone)
        .subscribe(data => {
            this.dataStore.irrigationZones.forEach((issue, i) => {
                if(issue._id === data.json()._id) { this.dataStore.irrigationZones[i] = data.json(); }
            });
            this.allIrrigationZones.next(Object.assign({}, this.dataStore).irrigationZones);
        }, error => console.log('Could not Update!'));
    }

    remove(issueId : string) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        this.http.delete('http://localhost:3000/zones/zone/'+issueId)
        .subscribe(response => {
            this.dataStore.irrigationZones.forEach((issue, i) => {
                if(issue._id === issueId) { this.dataStore.irrigationZones.splice(i, 1); }
            });
            this.allIrrigationZones.next(Object.assign({}, this.dataStore).irrigationZones);
        }, error => console.log('could not remove'));
    }
}
