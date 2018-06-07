import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector   : 'fuse-coming-soon',
    templateUrl: './coming-soon.component.html',
    styleUrls  : ['./coming-soon.component.scss'],
    animations : fuseAnimations
})
export class FuseComingSoonComponent implements OnInit
{
    comingSoonForm: FormGroup;
    comingSoonFormErrors: any;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder
    )
    {
        this.fuseConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.comingSoonFormErrors = {
            email: {}
        };
    }

    ngOnInit()
    {
        this.comingSoonForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });

        this.comingSoonForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });
    }

    onRegisterFormValuesChanged()
    {
        for ( const field in this.comingSoonFormErrors )
        {
            if ( !this.comingSoonFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.comingSoonFormErrors[field] = {};

            // Get the control
            const control = this.comingSoonForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.comingSoonFormErrors[field] = control.errors;
            }
        }
    }
}
