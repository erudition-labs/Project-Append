import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector     : 'fuse-quick-panel',
    templateUrl  : './quick-panel.component.html',
    styleUrls    : ['./quick-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseQuickPanelComponent implements OnInit
{
    date: Date;
    settings: any;
    notes: any[];
    events: any[];

    constructor(private http: HttpClient)
    {
        this.date = new Date();
        this.settings = {
            notify: true,
            cloud : false,
            retro : true
        };
    }

    ngOnInit()
    {
        this.http.get('api/quick-panel-notes')
            .subscribe((response: any) => {
                this.notes = response;
            });

        this.http.get('api/quick-panel-events')
            .subscribe((response: any) => {
                this.events = response;
            });

    }

}
