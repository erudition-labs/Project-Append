import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import { MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSelectModule, MatSidenavModule, MatTableModule, MatTabsModule } from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { FuseProjectDashboardComponent } from './project.component';
import { ProjectDashboardService } from './project.service';

const routes: Routes = [
    {
        path     : '**',
        component: FuseProjectDashboardComponent,
        resolve  : {
            data: ProjectDashboardService
        }
    }
];

@NgModule({
    declarations: [
        FuseProjectDashboardComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        CdkTableModule,
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatSidenavModule,
        MatTableModule,
        MatTabsModule,

        NgxChartsModule,

        FuseSharedModule,
        FuseWidgetModule
    ],
    providers   : [
        ProjectDashboardService
    ]
})
export class FuseProjectDashboardModule
{
}

