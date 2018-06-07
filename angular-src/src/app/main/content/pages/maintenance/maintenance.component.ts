import { Component } from '@angular/core';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector   : 'fuse-maintenance',
    templateUrl: './maintenance.component.html',
    styleUrls  : ['./maintenance.component.scss'],
    animations : fuseAnimations
})
export class FuseMaintenanceComponent
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
