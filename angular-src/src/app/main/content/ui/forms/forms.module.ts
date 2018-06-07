import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseFormsComponent } from './forms.component';

const routes: Routes = [
    {
        path     : 'forms',
        component: FuseFormsComponent
    }
];

@NgModule({
    declarations: [
        FuseFormsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,

        FuseSharedModule,
    ]
})
export class UIFormsModule
{
}
