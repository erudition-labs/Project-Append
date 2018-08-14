import { Injectable                                 } from '@angular/core';
import { Observable                                 } from 'rxjs/Rx';
import { Subject                                    } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class MessageService {
    private subject = new Subject<any>();

    sendMessage(msg : string) {
        this.subject.next({ text: msg });
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
