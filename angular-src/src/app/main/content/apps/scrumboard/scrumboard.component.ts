import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { Board } from './board.model';
import { ScrumboardService } from './scrumboard.service';

@Component({
    selector   : 'fuse-scrumboard',
    templateUrl: './scrumboard.component.html',
    styleUrls  : ['./scrumboard.component.scss'],
    animations : fuseAnimations
})
export class FuseScrumboardComponent implements OnInit, OnDestroy
{
    boards: any[];
    onBoardsChanged: Subscription;

    constructor(
        private  router: Router,
        private scrumboardService: ScrumboardService
    )
    {
    }

    ngOnInit()
    {
        this.onBoardsChanged =
            this.scrumboardService.onBoardsChanged
                .subscribe(boards => {
                    this.boards = boards;
                });
    }

    ngOnDestroy()
    {
        this.onBoardsChanged.unsubscribe();
    }

    newBoard()
    {
        const newBoard = new Board({});
        this.scrumboardService.createNewBoard(newBoard).then(() => {
            this.router.navigate(['/apps/scrumboard/boards/' + newBoard.id + '/' + newBoard.uri]);
        });
    }
}
