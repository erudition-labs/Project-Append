import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseMaintenanceComponent } from './maintenance.component';

const routes = [
    {
        path     : 'maintenance',
        component: FuseMaintenanceComponent
    }
];

@NgModule({
    declarations: [
        FuseMaintenanceComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        FuseSharedModule
    ]
})
export class MaintenanceModule
{
}
