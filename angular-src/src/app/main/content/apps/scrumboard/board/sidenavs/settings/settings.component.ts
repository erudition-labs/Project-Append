import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { ScrumboardService } from '../../../scrumboard.service';

@Component({
    selector   : 'fuse-scrumboard-board-settings',
    templateUrl: './settings.component.html',
    styleUrls  : ['./settings.component.scss'],
    animations : fuseAnimations
})
export class FuseScrumboardBoardSettingsSidenavComponent implements OnInit, OnDestroy
{
    board: any;
    view = 'main';
    onBoardChanged: Subscription;

    constructor(
        private scrumboardService: ScrumboardService
    )
    {
    }

    ngOnInit()
    {
        this.onBoardChanged =
            this.scrumboardService.onBoardChanged
                .subscribe(board => {
                    this.board = board;
                });
    }

    ngOnDestroy()
    {
        this.onBoardChanged.unsubscribe();
    }
    
    toggleCardCover()
    {
        this.board.settings.cardCoverImages = !this.board.settings.cardCoverImages;
        this.scrumboardService.updateBoard();
    }

    toggleSubcription()
    {
        this.board.settings.subscribed = !this.board.settings.subscribed;
        this.scrumboardService.updateBoard();
    }
}
