import { Component } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { ProfileService } from '../../profile.service';

@Component({
    selector   : 'fuse-profile-timeline',
    templateUrl: './timeline.component.html',
    styleUrls  : ['./timeline.component.scss'],
    animations : fuseAnimations
})
export class FuseProfileTimelineComponent
{
    timeline: any;

    constructor(private profileService: ProfileService)
    {
        this.profileService.timelineOnChanged.subscribe(timeline => {
            this.timeline = timeline;
        });
    }
}
