import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { UtilsService } from '@core/utils/utils.service';


@Component({
  selector: 'email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

	constructor(private _router			: Router,
				private _route 			: ActivatedRoute,
                private _authService 	: AuthService,
                private _utils          : UtilsService) { }

	ngOnInit() {
		this._route.params.subscribe((params) => {
			this._authService.verify(params.code).subscribe((result) => {
				if(result !== undefined && result.success) {
                    this._utils.success("You will be automatically redirected");
					//this.messages.push(result.msg);
					//this.messages.push("You will be automatically redirected");
					setTimeout(() => {
						return this._router.navigateByUrl("login");
					}, 5000);
				} else {
                    this._utils.error("Confirmation Failed");
          	//this.errors.push("Confirmation Failed");
          setTimeout(() => {
            return this._router.navigateByUrl("login");
          }, 2000);
				}
			});
		});

	}

}
