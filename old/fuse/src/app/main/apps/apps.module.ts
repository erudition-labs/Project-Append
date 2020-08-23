import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '@core/auth/auth-guard.service';

import { FuseSharedModule } from '@fuse/shared.module';
const routes = [
    {
        path        : 'events',
        loadChildren: './events/events.module#EventsModule',
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class AppsModule
{
}