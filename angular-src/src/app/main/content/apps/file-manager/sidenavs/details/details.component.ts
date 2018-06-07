import { Component, OnInit } from '@angular/core';

import { fuseAnimations } from '@fuse/animations/index';

import { FileManagerService } from '../../file-manager.service';

@Component({
    selector   : 'fuse-file-manager-details-sidenav',
    templateUrl: './details.component.html',
    styleUrls  : ['./details.component.scss'],
    animations : fuseAnimations
})
export class FuseFileManagerDetailsSidenavComponent implements OnInit
{

    selected: any;

    constructor(private fileManagerService: FileManagerService)
    {

    }

    ngOnInit()
    {
        this.fileManagerService.onFileSelected.subscribe(selected => {
            this.selected = selected;
        });
    }

}
