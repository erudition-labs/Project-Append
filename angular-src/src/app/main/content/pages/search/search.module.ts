import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule, MatTabsModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { SearchService } from './search.service';
import { FuseSearchClassicComponent } from './tabs/classic/classic.component';
import { FuseSearchTableComponent } from './tabs/table/table.component';
import { FuseSearchComponent } from './search.component';

const routes = [
    {
        path     : 'search',
        component: FuseSearchComponent,
        resolve  : {
            search: SearchService
        }
    }
];

@NgModule({
    declarations: [
        FuseSearchComponent,
        FuseSearchClassicComponent,
        FuseSearchTableComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        CdkTableModule,

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatTabsModule,

        FuseSharedModule
    ],
    providers   : [
        SearchService
    ]
})
export class SearchModule
{
}
