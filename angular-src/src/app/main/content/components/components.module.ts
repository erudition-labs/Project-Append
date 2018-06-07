import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatButtonToggleModule, MatFormFieldModule, MatIconModule, MatListModule, MatMenuModule, MatSelectModule, MatSlideToggleModule, MatTabsModule } from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseCountdownModule, FuseHighlightModule, FuseMaterialColorPickerModule, FuseWidgetModule } from '@fuse/components';

import { FuseAngularMaterialModule } from './angular-material/angular-material.module';
import { FuseCardsDocsComponent } from './cards/cards.component';
import { FuseCountdownDocsComponent } from './countdown/countdown.component';
import { FuseHighlightDocsComponent } from './highlight/highlight.component';
import { FuseMaterialColorPickerDocsComponent } from './material-color-picker/material-color-picker.component';
import { FuseMultiLanguageDocsComponent } from './multi-language/multi-language.component';
import { FuseNavigationDocsComponent } from './navigation/navigation.component';
import { FuseSearchBarDocsComponent } from './search-bar/search-bar.component';
import { FuseSidebarDocsComponent } from './sidebar/sidebar.component';
import { FuseShortcutsDocsComponent } from './shortcuts/shortcuts.component';
import { FuseWidgetDocsComponent } from './widget/widget.component';

const routes = [
    {
        path     : 'cards',
        component: FuseCardsDocsComponent
    },
    {
        path     : 'countdown',
        component: FuseCountdownDocsComponent
    },
    {
        path     : 'highlight',
        component: FuseHighlightDocsComponent
    },
    {
        path     : 'material-color-picker',
        component: FuseMaterialColorPickerDocsComponent
    },
    {
        path     : 'multi-language',
        component: FuseMultiLanguageDocsComponent
    },
    {
        path     : 'navigation',
        component: FuseNavigationDocsComponent
    },
    {
        path     : 'search-bar',
        component: FuseSearchBarDocsComponent
    },
    {
        path     : 'sidebar',
        component: FuseSidebarDocsComponent
    },
    {
        path     : 'shortcuts',
        component: FuseShortcutsDocsComponent
    },
    {
        path     : 'widget',
        component: FuseWidgetDocsComponent
    }
];

@NgModule({
    declarations: [
        FuseCardsDocsComponent,
        FuseCountdownDocsComponent,
        FuseHighlightDocsComponent,
        FuseMaterialColorPickerDocsComponent,
        FuseMultiLanguageDocsComponent,
        FuseNavigationDocsComponent,
        FuseSearchBarDocsComponent,
        FuseSidebarDocsComponent,
        FuseShortcutsDocsComponent,
        FuseWidgetDocsComponent
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
        FuseWidgetModule,
        FuseAngularMaterialModule
    ]
})
export class FuseComponentsModule
{
}
