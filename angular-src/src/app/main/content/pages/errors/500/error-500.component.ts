import { Component } from '@angular/core';

import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector   : 'fuse-error-500',
    templateUrl: './error-500.component.html',
    styleUrls  : ['./error-500.component.scss']
})
export class FuseError500Component
{
    constructor(
        private fuseConfig: FuseConfigService
    )
    {
        this.fuseConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });
    }
}
