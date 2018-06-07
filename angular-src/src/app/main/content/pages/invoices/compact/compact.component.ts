import { Component } from '@angular/core';

import { InvoiceService } from '../invoice.service';

@Component({
    selector   : 'fuse-invoice-compact',
    templateUrl: './compact.component.html',
    styleUrls  : ['./compact.component.scss']
})
export class FuseInvoiceCompactComponent
{
    invoice: any;

    constructor(private invoiceService: InvoiceService)
    {
        this.invoiceService.invoiceOnChanged
            .subscribe((invoice) => {
                this.invoice = invoice;
            });
    }

}
