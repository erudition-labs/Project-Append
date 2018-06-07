import { Component } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { ProfileService } from '../../profile.service';

@Component({
    selector   : 'fuse-profile-photos-videos',
    templateUrl: './photos-videos.component.html',
    styleUrls  : ['./photos-videos.component.scss'],
    animations : fuseAnimations
})
export class FuseProfilePhotosVideosComponent
{
    photosVideos: any;

    constructor(private profileService: ProfileService)
    {
        this.profileService.photosVideosOnChanged.subscribe(photosVideos => {
            this.photosVideos = photosVideos;
        });
    }
}
