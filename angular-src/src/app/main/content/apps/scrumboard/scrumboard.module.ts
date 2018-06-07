import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule, MatRippleModule, MatSidenavModule, MatToolbarModule, MatTooltipModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseMaterialColorPickerModule } from '@fuse/components';

import { BoardResolve, ScrumboardService } from './scrumboard.service';
import { FuseScrumboardComponent } from './scrumboard.component';
import { FuseScrumboardBoardComponent } from './board/board.component';
import { FuseScrumboardBoardListComponent } from './board/list/list.component';
import { FuseScrumboardBoardCardComponent } from './board/list/card/card.component';
import { FuseScrumboardBoardEditListNameComponent } from './board/list/edit-list-name/edit-list-name.component';
import { FuseScrumboardBoardAddCardComponent } from './board/list/add-card/add-card.component';
import { FuseScrumboardBoardAddListComponent } from './board/add-list/add-list.component';
import { FuseScrumboardCardDialogComponent } from './board/dialogs/card/card.component';
import { FuseScrumboardLabelSelectorComponent } from './board/dialogs/card/label-selector/label-selector.component';
import { FuseScrumboardEditBoardNameComponent } from './board/edit-board-name/edit-board-name.component';
import { FuseScrumboardBoardSettingsSidenavComponent } from './board/sidenavs/settings/settings.component';
import { FuseScrumboardBoardColorSelectorComponent } from './board/sidenavs/settings/board-color-selector/board-color-selector.component';
import { NgxDnDModule } from '@swimlane/ngx-dnd';

const routes: Routes = [
    {
        path     : 'boards',
        component: FuseScrumboardComponent,
        resolve  : {
            scrumboard: ScrumboardService
        }
    },
    {
        path     : 'boards/:boardId/:boardUri',
        component: FuseScrumboardBoardComponent,
        resolve  : {
            board: BoardResolve
        }
    },
    {
        path      : '**',
        redirectTo: 'boards'
    }
];

@NgModule({
    declarations   : [
        FuseScrumboardComponent,
        FuseScrumboardBoardComponent,
        FuseScrumboardBoardListComponent,
        FuseScrumboardBoardCardComponent,
        FuseScrumboardBoardEditListNameComponent,
        FuseScrumboardBoardAddCardComponent,
        FuseScrumboardBoardAddListComponent,
        FuseScrumboardCardDialogComponent,
        FuseScrumboardLabelSelectorComponent,
        FuseScrumboardEditBoardNameComponent,
        FuseScrumboardBoardSettingsSidenavComponent,
        FuseScrumboardBoardColorSelectorComponent
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTooltipModule,

        NgxDnDModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseMaterialColorPickerModule
    ],
    providers      : [
        ScrumboardService,
        BoardResolve
    ],
    entryComponents: [FuseScrumboardCardDialogComponent]
})
export class FuseScrumboardModule
{
}
