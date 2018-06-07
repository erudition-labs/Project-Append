import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { COMPONENT_MAP } from './example-components';

@Component({
    selector   : 'fuse-angular-material',
    templateUrl: './angular-material.component.html',
    styleUrls  : ['./angular-material.component.scss']
})
export class FuseAngularMaterialComponent implements OnInit
{
    id: string;
    title: string;
    examples: any;

    constructor(
        private route: ActivatedRoute
    )
    {
    }

    ngOnInit()
    {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            const _title = this.id.replace('-', ' ');
            this.title = _title.charAt(0).toUpperCase() + _title.substring(1);
            this.examples = COMPONENT_MAP[this.id];
        });
    }
}

