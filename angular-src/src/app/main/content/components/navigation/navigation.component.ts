import { Component } from '@angular/core';

import { navigation } from 'app/navigation/navigation';

@Component({
    selector   : 'fuse-navigation-docs',
    templateUrl: './navigation.component.html',
    styleUrls  : ['./navigation.component.scss']
})
export class FuseNavigationDocsComponent
{
    navigation: any;
    hidden = false;

    constructor()
    {
        this.navigation = navigation;
    }

    showHideCalendarMenuItem()
    {
        // Get the calendar item from the navigation
        const calendarNavItem = this.navigation[0].children[1];

        // Toggle the visibility
        this.hidden = !this.hidden;
        calendarNavItem.hidden = this.hidden;
    }

    updateMailBadge()
    {
        // Get the mail nav item
        const mailNavItem = this.navigation[0].children[4];

        // Update the badge title
        mailNavItem.badge.title = 35;
    }

    addSubitemToCalendar()
    {
        // Prepare the new nav item
        const newNavItem = {
            id   : 'sub-item',
            title: 'Sub Item',
            type : 'item',
            url  : '/apps/calendar'
        };

        // Get the calendar item from the navigation
        const calendarNavItem = this.navigation[0].children[1];

        // Make the calendar navigation item collapsable
        calendarNavItem.type = 'collapse';

        // Create an empty children array
        calendarNavItem.children = [];

        // Push the new children
        calendarNavItem.children.push(newNavItem);
    }

    addNavItemWithCustomFunction()
    {
        // Prepare the new nav item
        const newNavItem = {
            id      : 'custom-item',
            title   : 'Custom Item',
            type    : 'item',
            function: () => {
                alert('Custom function!');
            }
        };

        // Get the applications nav item
        const applicationsNavItem = this.navigation[0];

        // Add the new nav item at the beginning of the applications
        applicationsNavItem.children.unshift(newNavItem);
    }
}
