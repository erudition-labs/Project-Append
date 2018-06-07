import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { List } from '../list.model';
import { ScrumboardService } from '../scrumboard.service';

@Component({
    selector   : 'fuse-scrumboard-board',
    templateUrl: './board.component.html',
    styleUrls  : ['./board.component.scss'],
    animations : fuseAnimations
})
export class FuseScrumboardBoardComponent implements OnInit, OnDestroy
{
    board: any;
    onBoardChanged: Subscription;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
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

    onListAdd(newListName)
    {
        if ( newListName === '' )
        {
            return;
        }

        this.scrumboardService.addList(new List({name: newListName}));
    }

    onBoardNameChanged(newName)
    {
        this.scrumboardService.updateBoard();
        this.location.go('/apps/scrumboard/boards/' + this.board.id + '/' + this.board.uri);
    }

    onDrop(ev)
    {
        this.scrumboardService.updateBoard();
    }
}
