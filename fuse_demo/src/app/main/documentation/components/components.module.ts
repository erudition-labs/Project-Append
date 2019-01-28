import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    MatButtonModule, MatButtonToggleModule, MatFormFieldModule, MatIconModule, MatListModule, MatMenuModule, MatSelectModule, MatSlideToggleModule, MatTabsModule
} from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseCountdownModule, FuseHighlightModule, FuseMaterialColorPickerModule, FuseWidgetModule } from '@fuse/components';
import { DocsComponentsCardsComponent } from 'app/main/documentation/components/cards/cards.component';
import { DocsComponentsCountdownComponent } from 'app/main/documentation/components/countdown/countdown.component';
import { DocsComponentsHighlightComponent } from 'app/main/documentation/components/highlight/highlight.component';
import { DocsComponentsMaterialColorPickerComponent } from 'app/main/documentation/components/material-color-picker/material-color-picker.component';
import { DocsComponentsNavigationComponent } from 'app/main/documentation/components/navigation/navigation.component';
import { DocsComponentsProgressBarComponent } from 'app/main/documentation/components/progress-bar/progress-bar.component';
import { DocsComponentsSearchBarComponent } from 'app/main/documentation/components/search-bar/search-bar.component';
import { DocsComponentsSidebarComponent } from 'app/main/documentation/components/sidebar/sidebar.component';
import { DocsComponentsShortcutsComponent } from 'app/main/documentation/components/shortcuts/shortcuts.component';
import { DocsComponentsWidgetComponent } from 'app/main/documentation/components/widget/widget.component';

const routes = [
    {
        path     : 'cards',
        component: DocsComponentsCardsComponent
    },
    {
        path     : 'countdown',
        component: DocsComponentsCountdownComponent
    },
    {
        path     : 'highlight',
        component: DocsComponentsHighlightComponent
    },
    {
        path     : 'material-color-picker',
        component: DocsComponentsMaterialColorPickerComponent
    },
    {
        path     : 'navigation',
        component: DocsComponentsNavigationComponent
    },
    {
        path     : 'progress-bar',
        component: DocsComponentsProgressBarComponent
    },
    {
        path     : 'search-bar',
        component: DocsComponentsSearchBarComponent
    },
    {
        path     : 'sidebar',
        component: DocsComponentsSidebarComponent
    },
    {
        path     : 'shortcuts',
        component: DocsComponentsShortcutsComponent
    },
    {
        path     : 'widget',
        component: DocsComponentsWidgetComponent
    }
];

@NgModule({
    declarations: [
        DocsComponentsCardsComponent,
        DocsComponentsCountdownComponent,
        DocsComponentsHighlightComponent,
        DocsComponentsMaterialColorPickerComponent,
        DocsComponentsNavigationComponent,
        DocsComponentsProgressBarComponent,
        DocsComponentsSearchBarComponent,
        DocsComponentsSidebarComponent,
        DocsComponentsShortcutsComponent,
        DocsComponentsWidgetComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTabsModule,

        NgxChartsModule,

        FuseSharedModule,

        FuseCountdownModule,
        FuseHighlightModule,
        FuseMaterialColorPickerModule,
        FuseWidgetModule
    ]
})
export class ComponentsModule
{
}
