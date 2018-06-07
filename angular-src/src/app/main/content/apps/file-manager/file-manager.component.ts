import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { FileManagerService } from './file-manager.service';

@Component({
    selector     : 'fuse-file-manager',
    templateUrl  : './file-manager.component.html',
    styleUrls    : ['./file-manager.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class FuseFileManagerComponent implements OnInit
{
    selected: any;
    pathArr: string[];

    constructor(private fileManagerService: FileManagerService)
    {
    }

    ngOnInit()
    {
        this.fileManagerService.onFileSelected.subscribe(selected => {
            this.selected = selected;
            this.pathArr = selected.location.split('>');
        });
    }
}
