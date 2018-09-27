import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule, MatTabsModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { SearchService } from 'app/main/pages/search/search.service';
import { SearchComponent } from 'app/main/pages/search/search.component';
import { SearchClassicComponent } from 'app/main/pages/search/tabs/classic/classic.component';
import { SearchTableComponent } from 'app/main/pages/search/tabs/table/table.component';


const routes = [
    {
        path     : 'search',
        component: SearchComponent,
        resolve  : {
            search: SearchService
        }
    }
];

@NgModule({
    declarations: [
        SearchComponent,
        SearchClassicComponent,
        SearchTableComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

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
