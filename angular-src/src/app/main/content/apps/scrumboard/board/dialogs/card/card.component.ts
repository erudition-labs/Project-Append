import { Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms/src/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatMenuTrigger } from '@angular/material';

import { Subscription } from 'rxjs';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { FuseUtils } from '@fuse/utils';

import { ScrumboardService } from '../../../scrumboard.service';

@Component({
    selector     : 'fuse-scrumboard-board-card-dialog',
    templateUrl  : './card.component.html',
    styleUrls    : ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseScrumboardCardDialogComponent implements OnInit, OnDestroy
{
    card: any;
    board: any;
    list: any;

    onBoardChanged: Subscription;
    toggleInArray = FuseUtils.toggleInArray;

    @ViewChild('checklistMenuTrigger') checklistMenu: MatMenuTrigger;
    @ViewChild('newCheckListTitleField') newCheckListTitleField;

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(
        public dialogRef: MatDialogRef<FuseScrumboardCardDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        public dialog: MatDialog,
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

                    this.card = this.board.cards.find((_card) => {
                        return this.data.cardId === _card.id;
                    });

                    this.list = this.board.lists.find((_list) => {
                        return this.data.listId === _list.id;
                    });
                });
    }

    /**
     * Remove Due date
     */
    removeDueDate()
    {
        this.card.due = '';
        this.updateCard();
    }

    /**
     * Toggle Subscribe
     */
    toggleSubscribe()
    {
        this.card.subscribed = !this.card.subscribed;

        this.updateCard();
    }

    /**
     * Toggle Cover Image
     * @param attachmentId
     */
    toggleCoverImage(attachmentId)
    {
        if ( this.card.idAttachmentCover === attachmentId )
        {
            this.card.idAttachmentCover = '';
        }
        else
        {
            this.card.idAttachmentCover = attachmentId;
        }

        this.updateCard();
    }

    /**
     * Remove Attachment
     * @param attachment
     */
    removeAttachment(attachment)
    {
        if ( attachment.id === this.card.idAttachmentCover )
        {
            this.card.idAttachmentCover = '';
        }

        this.card.attachments.splice(this.card.attachments.indexOf(attachment), 1);

        this.updateCard();
    }

    /**
     * Remove Checklist
     * @param checklist
     */
    removeChecklist(checklist)
    {
        this.card.checklists.splice(this.card.checklists.indexOf(checklist), 1);

        this.updateCard();
    }

    /**
     * Update Checked Count
     * @param list
     */
    updateCheckedCount(list)
    {
        const checkItems = list.checkItems;
        let checkedItems = 0;
        let allCheckedItems = 0;
        let allCheckItems = 0;

        for ( const checkItem of checkItems )
        {
            if ( checkItem.checked )
            {
                checkedItems++;
            }
        }

        list.checkItemsChecked = checkedItems;

        for ( const item of this.card.checklists )
        {
            allCheckItems += item.checkItems.length;
            allCheckedItems += item.checkItemsChecked;
        }

        this.card.checkItems = allCheckItems;
        this.card.checkItemsChecked = allCheckedItems;

        this.updateCard();
    }

    /**
     * Remove Checklist Item
     * @param checkItem
     * @param checklist
     */
    removeChecklistItem(checkItem, checklist)
    {
        checklist.checkItems.splice(checklist.checkItems.indexOf(checkItem), 1);

        this.updateCheckedCount(checklist);

        this.updateCard();
    }

    /**
     * Add Check Item
     * @param {NgForm} form
     * @param checkList
     */
    addCheckItem(form: NgForm, checkList)
    {
        const checkItemVal = form.value.checkItem;

        if ( !checkItemVal || checkItemVal === '' )
        {
            return;
        }

        const newCheckItem = {
            'name'   : checkItemVal,
            'checked': false
        };

        checkList.checkItems.push(newCheckItem);

        this.updateCheckedCount(checkList);

        form.setValue({checkItem: ''});

        this.updateCard();
    }

    /**
     * Add Checklist
     * @param {NgForm} form
     */
    addChecklist(form: NgForm)
    {
        this.card.checklists.push({
            id               : FuseUtils.generateGUID(),
            name             : form.value.checklistTitle,
            checkItemsChecked: 0,
            checkItems       : []
        });

        form.setValue({checklistTitle: ''});
        form.resetForm();
        this.checklistMenu.closeMenu();
        this.updateCard();
    }

    /**
     * On Checklist Menu Open
     */
    onChecklistMenuOpen()
    {
        setTimeout(() => {
            this.newCheckListTitleField.nativeElement.focus();
        });
    }

    /**
     * Add New Comment
     * @param {NgForm} form
     */
    addNewComment(form: NgForm)
    {
        const newCommentText = form.value.newComment;

        const newComment = {
            idMember: '36027j1930450d8bf7b10158',
            message : newCommentText,
            time    : 'now'
        };

        this.card.comments.unshift(newComment);

        form.setValue({newComment: ''});

        this.updateCard();
    }

    /**
     * Remove Card
     */
    removeCard()
    {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete the card?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this.dialogRef.close();
                this.scrumboardService.removeCard(this.card.id, this.list.id);
            }
        });
    }

    /**
     * Update Card
     */
    updateCard()
    {
        this.scrumboardService.updateCard(this.card);
    }

    ngOnDestroy()
    {
        this.onBoardChanged.unsubscribe();
    }
}
