import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
  	title: 'Events',
	  icon: 'nb-tables',
	  link: '/pages/events',
  },
  {
  	title: 'User Directory',
	  icon: 'nb-person',
	  link: '/pages/user-management',
  },
  {
  	title: 'Updates',
	  icon: 'nb-alert',
	  link: '/pages/updates',
  },
];

export const MENU_ITEMS_ADMIN: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
  	title: 'Events',
	  icon: 'nb-tables',
	  link: '/pages/events',
  },
  {
  	title: 'User Management',
	  icon: 'nb-person',
	  link: '/pages/user-management',
  },
  {
  	title: 'Updates',
	  icon: 'nb-alert',
	  link: '/pages/updates',
  },
];
