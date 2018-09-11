import { Component } from '@angular/core';
import { AuthService } from '../@core/auth/auth.service';
import { MENU_ITEMS } from './pages-menu';
import { MENU_ITEMS_ADMIN } from './pages-menu';


@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {
  menu : any;
  constructor(private authService : AuthService) {
    if(this.authService.isAdmin()) {
      this.menu = MENU_ITEMS_ADMIN;
    } else {
      this.menu = MENU_ITEMS;
    }
   }
}
