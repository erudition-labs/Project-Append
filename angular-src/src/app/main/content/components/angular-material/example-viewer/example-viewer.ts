import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-typescript';

import { EXAMPLE_COMPONENTS } from '../example-components';

import { fuseAnimations } from '@fuse/animations';
import { FuseCopierService } from '@fuse/services/copier.service';

export interface LiveExample
{
    title: string;
    component: any;
    additionalFiles?: string[];
    selectorName?: string;
}

@Component({
    selector     : 'fuse-example-viewer',
    templateUrl  : './example-viewer.html',
    styleUrls    : ['./example-viewer.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class FuseExampleViewerComponent implements AfterViewInit, OnDestroy
{
    previewRef: ComponentRef<any>;
    selectedIndex = 0;

    get container(): ViewContainerRef
    {
        return this._previewContainer;
    }

    set container(value: ViewContainerRef)
    {
        this._previewContainer = value;
    }

    @ViewChild('previewContainer', {read: ViewContainerRef}) private _previewContainer: ViewContainerRef;

    /** String key of the currently displayed example. */
    _example: string;
    exampleData: LiveExample;

    /** Whether the source for the example is being displayed. */
    showSource = false;

    constructor(
        private snackbar: MatSnackBar,
        private copier: FuseCopierService,
        private _resolver: ComponentFactoryResolver
    )
    {
    }

    ngAfterViewInit()
    {
        setTimeout(() => {
            const cmpFactory = this._resolver.resolveComponentFactory(this.exampleData.component);
            this.previewRef = this._previewContainer.createComponent(cmpFactory);
        }, 0);
    }

    ngOnDestroy()
    {
        if ( this.previewRef )
        {
            this.previewRef.destroy();
        }
    }

    get example()
    {
        return this._example;
    }

    @Input()
    set example(example: string)
    {
        if ( example && EXAMPLE_COMPONENTS[example] )
        {
            this._example = example;
            this.exampleData = EXAMPLE_COMPONENTS[example];
        }
        else
        {
            console.log('MISSING EXAMPLE: ', example);
        }
    }

    toggleSourceView(): void
    {
        this.showSource = !this.showSource;
    }

    copySource(text: string)
    {
        if ( this.copier.copyText(text) )
        {
            this.snackbar.open('Code copied', '', {duration: 2500});
        }
        else
        {
            this.snackbar.open('Copy failed. Please try again!', '', {duration: 2500});
        }
    }
}
