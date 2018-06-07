import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatIconModule, MatTabsModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseHighlightModule } from '@fuse/components';

import { FuseHelperClassesComponent } from './helper-classes.component';
import { FuseHelperClassesPaddingMarginComponent } from './tabs/padding-margin/padding-margin.component';
import { FuseHelperClassesWidthHeightComponent } from './tabs/width-height/width-height.component';

const routes: Routes = [
    {
        path     : 'helper-classes',
        component: FuseHelperClassesComponent
    }
];

@NgModule({
    declarations: [
        FuseHelperClassesComponent,
        FuseHelperClassesPaddingMarginComponent,
        FuseHelperClassesWidthHeightComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatIconModule,
        MatTabsModule,

        FuseSharedModule,
        FuseHighlightModule,
    ],
})
export class UIHelperClassesModule
{
}
