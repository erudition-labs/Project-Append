import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import io from "socket.io-client";
import { environment } from '../../environments/environment';
import { LoadEvents } from 'app/main/apps/events/_store/events.actions';
import { LoadUsers } from '../store/users/users.actions';



@Injectable({
	providedIn: 'root'
})

export class SocketService {

    private socket;
    constructor(private _store: Store) {}

    connect() : boolean {
        this.socket = io.connect(environment.API_URL);
        console.log(this.socket.connected);
        return this.socket.connected;
    }

    listen() : void {
        this.socket.on('Data Sync', function(msg) {
            this._store.dispatch(new LoadEvents());
            this._store.dispatch(new LoadUsers());
        });
    }
}