import { Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { KnowledgeBaseService } from './knowledge-base.service';
import { FuseKnowledgeBaseArticleComponent } from './dialogs/article/article.component';

@Component({
    selector     : 'fuse-knowledge-base',
    templateUrl  : './knowledge-base.component.html',
    styleUrls    : ['./knowledge-base.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseKnowledgeBaseComponent implements OnInit, OnDestroy
{
    knowledgeBase: any;
    onKnowledgeBaseChanged: Subscription;

    constructor(
        private knowledgeBaseService: KnowledgeBaseService,
        private matDialog: MatDialog
    )
    {

    }

    ngOnInit()
    {
        this.onKnowledgeBaseChanged =
            this.knowledgeBaseService.onKnowledgeBaseChanged
                .subscribe(response => {
                    this.knowledgeBase = response;
                });
    }

    ngOnDestroy()
    {
        this.onKnowledgeBaseChanged.unsubscribe();
    }

    readArticle(article)
    {
        this.matDialog.open(FuseKnowledgeBaseArticleComponent, {
            panelClass: 'knowledgebase-article-dialog',
            data : {article: article}
        });
    }
}
