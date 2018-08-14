import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'notifications',    title: 'Notifications',     icon:'notifications',       class: '' },
    { path: 'schedule',         title: 'Schedule',          icon: 'content_paste',      class: '' },
    { path: 'weather',          title: 'Weather',           icon: 'cloud',              class: '' },
    { path: 'events',           title: 'Events',            icon: 'bookmark_border',    class: '' },
    { path: 'maps',             title: 'Map',               icon: 'location_on',        class: '' },
    { path: 'man-operations',   title: 'Manual Operations', icon:'settings',            class: '' },
    { path: 'reports',          title: 'Reports',           icon: 'assessment',         class: '' },
    { path: 'roles',            title: 'Roles',             icon: 'people',             class: '' },
    { path: 'irrigation-zones', title: 'Manage Zones',      icon: 'extension',             class: '' }
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor() { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
