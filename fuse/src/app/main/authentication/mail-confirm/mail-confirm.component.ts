import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../@core/auth/auth.service';

@Component({
    selector     : 'mail-confirm',
    templateUrl  : './mail-confirm.component.html',
    styleUrls    : ['./mail-confirm.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MailConfirmComponent implements OnInit{

    messages		: string[] = [];
    errors			: string[] = [];
    confirmed       : boolean = false;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private router				: Router,
		private route 				: ActivatedRoute,
		private authService 		: AuthService
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    ngOnInit() {
		this.route.params.subscribe((params) => {
			this.authService.verify(params.code).subscribe((result) => {
				if(result !== undefined && result.success) {
                    this.messages.push(result.msg);
                    console.log(result.msg);
                    
                    this.messages.push("You will be automatically redirected");
                    this.confirmed = true;
					setTimeout(() => {
						return this.router.navigateByUrl("login");
					}, 4000);
				} else {
              this.errors.push("Confirmation Failed");
              this.confirmed = false;
          setTimeout(() => {
            return this.router.navigateByUrl("login");
          }, 4000);
				}
			});
		});

	}
}
