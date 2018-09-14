import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AuthService } from '../../../@core/auth/auth.service';
import { UserService } from '../../../@core/user/user.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { User } from '../../../@core/user/user.model';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  private userInfo: any;
  private isAuthenticated : boolean = false;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService  	: NbSidebarService,
              private menuService	    	: NbMenuService,
              private analyticsService	: AnalyticsService,
              private authService       : AuthService,
              private userService       : UserService) {
  }

	ngOnInit() {
   let decodedToken = this.authService.getUserInfo();
   this.userService.getUser(decodedToken.sub).subscribe(httpResult  => {
       this.userInfo = httpResult;
   });
	}

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
