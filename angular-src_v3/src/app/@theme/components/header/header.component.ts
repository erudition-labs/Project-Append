import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/user/user.service';
import { AuthService } from '../../../@core/auth/auth.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  userInfo: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
			  private authService: AuthService,
              private userService: UserService,
              private analyticsService: AnalyticsService) {
  }

	ngOnInit() {
		console.log(this.authService.isAuthenticated());
		this.userInfo = this.authService.getUserInfo();
		console.log(this.userInfo);
  //  this.userService.getUsers()
  //  .subscribe((users: any) => this.user = users.nick);

	this.menuService.onItemClick()
		.pipe(
		filter(({ tag }) => tag === 'usermenu'),
		map(({ item: { title } }) => title),
		).subscribe(title => {
			if(title === 'Log out') {
				this.authService.logout();
			}

			if(title === 'Profile') {
			
			}
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
