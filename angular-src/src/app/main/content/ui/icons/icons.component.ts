import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector   : 'fuse-icons',
    templateUrl: './icons.component.html',
    styleUrls  : ['./icons.component.scss']
})
export class FuseIconsComponent implements OnInit
{
    icons: string[];
    filteredIcons: string[];
    loading = true;

    constructor(private http: HttpClient)
    {
    }

    ngOnInit()
    {
        this.http.get('api/icons')
            .subscribe((icons: any) => {
                this.icons = icons;
                this.filteredIcons = this.icons;
                this.loading = false;
            });
    }

    filterIcons(event)
    {
        const value = event.target.value;

        this.filteredIcons = this.icons.filter(icon => {
            return icon.includes(value);
        });
    }
}
