import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector     : 'fuse-scrumboard-board-card',
    templateUrl  : './card.component.html',
    styleUrls    : ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseScrumboardBoardCardComponent implements OnInit
{
    @Input() cardId;
    card: any;
    board: any;

    constructor(
        private route: ActivatedRoute,
    )
    {
    }

    ngOnInit()
    {
        this.board = this.route.snapshot.data.board;
        this.card = this.board.cards.filter((card) => {
            return this.cardId === card.id;
        })[0];
    }

    /**
     * Is the card overdue?
     *
     * @param cardDate
     * @returns {boolean}
     */
    isOverdue(cardDate)
    {
        return moment() > moment(new Date(cardDate));
    }

}
