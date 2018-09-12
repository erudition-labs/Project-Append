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
	  icon: 'nb-email',
	  link: '/pages/updates',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
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
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
