import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector     : 'fuse-knowledge-base-article',
    templateUrl  : './article.component.html',
    styleUrls    : ['./article.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseKnowledgeBaseArticleComponent
{
    article: any;

    constructor(
        public dialogRef: MatDialogRef<FuseKnowledgeBaseArticleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    )
    {
    }
}
