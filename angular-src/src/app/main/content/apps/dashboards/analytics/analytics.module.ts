import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSelectModule, MatTabsModule } from '@angular/material';

import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { FuseAnalyticsDashboardComponent } from './analytics.component';
import { AnalyticsDashboardService } from './analytics.service';


const routes: Routes = [
    {
        path     : '**',
        component: FuseAnalyticsDashboardComponent,
        resolve  : {
            data: AnalyticsDashboardService
        }
    }
];

@NgModule({
    declarations: [
        FuseAnalyticsDashboardComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTabsModule,

        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),
        ChartsModule,
        NgxChartsModule,

        FuseSharedModule,
        FuseWidgetModule
    ],
    providers   : [
        AnalyticsDashboardService
    ]
})
export class FuseAnalyticsDashboardModule
{
}

