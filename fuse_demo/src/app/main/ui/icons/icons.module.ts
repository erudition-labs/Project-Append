import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { IconsComponent } from 'app/main/ui/icons/icons.component';

const routes: Routes = [
    {
        path     : 'icons',
        component: IconsComponent
    }
];

@NgModule({
    declarations: [
        IconsComponent
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
