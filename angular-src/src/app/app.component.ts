/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@@kenpoangular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbMenuService } from '@nebular/theme';
import { AuthService } from './@core/auth/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  userInfo : any;

  constructor(private analytics   : AnalyticsService,
              private menuService : NbMenuService,
              private authService : AuthService,
              private router      : Router) 
              {}

  onContecxtItemSelection(title) {
    if(title === 'Log out') {
      this.authService.logout();
    }
    if(title === 'Profile') {
      this.router.navigateByUrl("/pages/profile");
    }
  }
  ngOnInit() {
    this.menuService.onItemClick()
        .subscribe((event) => {
          this.onContecxtItemSelection(event.item.title);
        });
    this.analytics.trackPageViews();
  }
}
