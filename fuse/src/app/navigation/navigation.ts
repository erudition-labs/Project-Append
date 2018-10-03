import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'dashboard',
                title    : 'Dashboard',
                translate: 'NAV.DASHBOARD.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/dashboard',
                badge    : {
                    title    : '99',
                    translate: 'NAV.DASHBOARD.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
            {
                id       : 'news',
                title    : 'News',
                translate: 'NAV.NEWS.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/news',
                badge    : {
                    title    : '25',
                    translate: 'NAV.NEWS.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
            

        ]
    }
];
