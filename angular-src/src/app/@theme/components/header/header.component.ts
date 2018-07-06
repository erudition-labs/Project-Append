import { Component, Input, OnInit 			} from '@angular/core';
import { NbAuthJWTToken, NbAuthService 		} from '@nebular/auth';
import { NbMenuService, NbSidebarService 	} from '@nebular/theme';
import { UserService 						} from '../../../@core/data/users.service';
import { AnalyticsService 					} from '../../../@core/utils/analytics.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

	constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
			  private authService: NbAuthService,
			  private analyticsService: AnalyticsService) {

		this.authService.onTokenChange()
			.subscribe((token: NbAuthJWTToken) => {
				if (token.isValid()) {
					this.user = token.getPayload().data;
				}
			 });
	}

  ngOnInit() {
  //this.userService.getUsers()
  //  .subscribe((users: any) => this.user = users.nick);
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