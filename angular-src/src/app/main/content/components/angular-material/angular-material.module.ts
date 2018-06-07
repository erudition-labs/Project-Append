import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from 'app/main/content/components/angular-material/material.module';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseHighlightModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { EXAMPLE_LIST } from './example-components';
import { FuseExampleViewerComponent } from './example-viewer/example-viewer';
import { FuseAngularMaterialComponent } from './angular-material.component';

const routes: Routes = [
    {
        path    : 'angular-material',
        children: [
            {
                path     : ':id',
                component: FuseAngularMaterialComponent
            }
        ]
    }
];

@NgModule({
    declarations   : [
        [...EXAMPLE_LIST],
        FuseAngularMaterialComponent,
        FuseExampleViewerComponent
    ],
    imports        : [
        RouterModule.forChild(routes),

        MaterialModule,

        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule
    ],
    entryComponents: EXAMPLE_LIST,
})
export class FuseAngularMaterialModule
{
}

