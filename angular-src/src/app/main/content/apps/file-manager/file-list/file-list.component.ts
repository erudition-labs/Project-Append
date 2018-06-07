import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

import { FileManagerService } from '../file-manager.service';
import { fuseAnimations } from '@fuse/animations/index';

@Component({
    selector   : 'fuse-file-list',
    templateUrl: './file-list.component.html',
    styleUrls  : ['./file-list.component.scss'],
    animations : fuseAnimations
})
export class FuseFileManagerFileListComponent implements OnInit
{
    files: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['icon', 'name', 'type', 'owner', 'size', 'modified', 'detail-button'];
    selected: any;

    constructor(private fileManagerService: FileManagerService)
    {
        this.fileManagerService.onFilesChanged.subscribe(files => {
            this.files = files;
        });
        this.fileManagerService.onFileSelected.subscribe(selected => {
            this.selected = selected;
        });
    }

    ngOnInit()
    {
        this.dataSource = new FilesDataSource(this.fileManagerService);
    }

    onSelect(selected)
    {
        this.fileManagerService.onFileSelected.next(selected);
    }
}

export class FilesDataSource extends DataSource<any>
{
    constructor(private fileManagerService: FileManagerService)
    {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]>
    {
        return this.fileManagerService.onFilesChanged;
    }

    disconnect()
    {
    }
}
