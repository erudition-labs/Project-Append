import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatIconModule } from '@angular/material';

import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseHighlightModule } from '@fuse/components/index';

import { DocsComponentsThirdPartyGoogleMapsComponent } from './google-maps.component';

const routes = [
    {
        path     : 'google-maps',
        component: DocsComponentsThirdPartyGoogleMapsComponent
    }
];

@NgModule({
    declarations: [
        DocsComponentsThirdPartyGoogleMapsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,

        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseHighlightModule
    ],
})
export class GoogleMapsModule
{
}
