import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import { MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSortModule, MatTableModule, MatTabsModule } from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { FuseEcommerceDashboardComponent } from './dashboard/dashboard.component';
import { EcommerceDashboardService } from './dashboard/dashboard.service';
import { FuseEcommerceProductsComponent } from './products/products.component';
import { EcommerceProductsService } from './products/products.service';
import { FuseEcommerceProductComponent } from './product/product.component';
import { EcommerceProductService } from './product/product.service';
import { FuseEcommerceOrdersComponent } from './orders/orders.component';
import { EcommerceOrdersService } from './orders/orders.service';
import { FuseEcommerceOrderComponent } from './order/order.component';
import { EcommerceOrderService } from './order/order.service';

const routes: Routes = [
    {
        path     : 'dashboard',
        component: FuseEcommerceDashboardComponent,
        resolve  : {
            data: EcommerceDashboardService
        }
    },
    {
        path     : 'products',
        component: FuseEcommerceProductsComponent,
        resolve  : {
            data: EcommerceProductsService
        }
    },
    {
        path     : 'products/:id',
        component: FuseEcommerceProductComponent,
        resolve  : {
            data: EcommerceProductService
        }
    },
    {
        path     : 'products/:id/:handle',
        component: FuseEcommerceProductComponent,
        resolve  : {
            data: EcommerceProductService
        }
    },
    {
        path     : 'orders',
        component: FuseEcommerceOrdersComponent,
        resolve  : {
            data: EcommerceOrdersService
        }
    },
    {
        path     : 'orders/:id',
        component: FuseEcommerceOrderComponent,
        resolve  : {
            data: EcommerceOrderService
        }
    }
];

@NgModule({
    declarations: [
        FuseEcommerceDashboardComponent,
        FuseEcommerceProductsComponent,
        FuseEcommerceProductComponent,
        FuseEcommerceOrdersComponent,
        FuseEcommerceOrderComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        CdkTableModule,
        MatButtonModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,

        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule,
    ],
    providers   : [
        EcommerceDashboardService,
        EcommerceProductsService,
        EcommerceProductService,
        EcommerceOrdersService,
        EcommerceOrderService
    ]
})
export class FuseEcommerceModule
{
}
