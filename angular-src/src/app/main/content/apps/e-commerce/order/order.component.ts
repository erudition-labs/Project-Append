import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { Order } from './order.model';
import { EcommerceOrderService } from './order.service';
import { orderStatuses } from './order-statuses';

@Component({
    selector     : 'fuse-e-commerce-order',
    templateUrl  : './order.component.html',
    styleUrls    : ['./order.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class FuseEcommerceOrderComponent implements OnInit, OnDestroy
{
    order = new Order();
    onOrderChanged: Subscription;
    statusForm: FormGroup;
    orderStatuses = orderStatuses;

    constructor(
        private orderService: EcommerceOrderService,
        private formBuilder: FormBuilder,
    )
    {

    }

    ngOnInit()
    {
        // Subscribe to update order on changes
        this.onOrderChanged =
            this.orderService.onOrderChanged
                .subscribe(order => {
                    this.order = new Order(order);
                });

        this.statusForm = this.formBuilder.group({
            newStatus: ['']
        });
    }

    ngOnDestroy()
    {
        this.onOrderChanged.unsubscribe();
    }

    updateStatus()
    {
        const newStatusId = Number.parseInt(this.statusForm.get('newStatus').value);

        if ( !newStatusId )
        {
            return;
        }

        const newStatus = this.orderStatuses.find((status) => {
            return status.id === newStatusId;
        });

        newStatus['date'] = new Date().toString();

        this.order.status.unshift(newStatus);
    }
}
