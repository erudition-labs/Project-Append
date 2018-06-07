import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseIconsComponent } from './icons.component';

const routes: Routes = [
    {
        path     : 'icons',
        component: FuseIconsComponent
    }
];

@NgModule({
    declarations: [
        FuseIconsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,

        FuseSharedModule
    ]
})
export class UIIconsModule
{
}
