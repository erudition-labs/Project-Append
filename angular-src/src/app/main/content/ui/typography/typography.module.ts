import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatIconModule, MatTabsModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseHighlightModule } from '@fuse/components';

import { FuseTypographyComponent } from './typography.component';
import { FuseTypographyHeadingsComponent } from './tabs/headings/headings.component';
import { FuseTypographyInlineTextElementsComponent } from './tabs/inline-text-elements/inline-text-elements.component';
import { FuseTypographyBlockquotesListsComponent } from './tabs/blockquotes-lists/blockquotes-lists.component';
import { FuseTypographyHelpersComponent } from './tabs/helpers/helpers.component';

const routes: Routes = [
    {
        path     : 'typography',
        component: FuseTypographyComponent
    }
];

@NgModule({
    declarations: [
        FuseTypographyComponent,
        FuseTypographyHeadingsComponent,
        FuseTypographyInlineTextElementsComponent,
        FuseTypographyBlockquotesListsComponent,
        FuseTypographyHelpersComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatIconModule,
        MatTabsModule,

        FuseSharedModule,
        FuseHighlightModule
    ]
})
export class UITypographyModule
{
}
