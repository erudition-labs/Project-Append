import { Component } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { ProfileService } from '../../profile.service';

@Component({
    selector   : 'fuse-profile-about',
    templateUrl: './about.component.html',
    styleUrls  : ['./about.component.scss'],
    animations : fuseAnimations
})
export class FuseProfileAboutComponent
{
    about: any;

    constructor(private profileService: ProfileService)
    {
        this.profileService.aboutOnChanged.subscribe(about => {
            this.about = about;
        });
    }
}
