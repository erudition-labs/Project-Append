import { Component } from '@angular/core';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector   : 'fuse-mail-confirm',
    templateUrl: './mail-confirm.component.html',
    styleUrls  : ['./mail-confirm.component.scss'],
    animations : fuseAnimations
})
export class FuseMailConfirmComponent
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
