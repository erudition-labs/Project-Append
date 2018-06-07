import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatIconModule, MatTabsModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseDemoModule } from '@fuse/components/demo/demo.module';

import { FuseColorsComponent } from './colors.component';

const routes: Routes = [
    {
        path     : 'colors',
        component: FuseColorsComponent
    }
];

@NgModule({
    declarations: [
        FuseColorsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatTabsModule,

        FuseSharedModule,
        FuseDemoModule
    ]
})
export class UIColorsModule
{
}
