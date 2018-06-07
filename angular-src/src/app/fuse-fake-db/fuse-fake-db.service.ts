import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ProjectDashboardDb } from './dashboard-project';
import { AnalyticsDashboardDb } from './dashboard-analytics';
import { CalendarFakeDb } from './calendar';
import { ECommerceFakeDb } from './e-commerce';
import { AcademyFakeDb } from './academy';
import { MailFakeDb } from './mail';
import { ChatFakeDb } from './chat';
import { FileManagerFakeDb } from './file-manager';
import { ContactsFakeDb } from './contacts';
import { TodoFakeDb } from './todo';
import { ScrumboardFakeDb } from './scrumboard';
import { InvoiceFakeDb } from './invoice';
import { ProfileFakeDb } from './profile';
import { SearchFakeDb } from './search';
import { FaqFakeDb } from './faq';
import { KnowledgeBaseFakeDb } from './knowledge-base';
import { IconsFakeDb } from './icons';
import { QuickPanelFakeDb } from './quick-panel';

export class FuseFakeDbService implements InMemoryDbService
{
    createDb()
    {
        return {
            // Dashboards
            'project-dashboard-projects' : ProjectDashboardDb.projects,
            'project-dashboard-widgets'  : ProjectDashboardDb.widgets,
            'analytics-dashboard-widgets': AnalyticsDashboardDb.widgets,

            // Calendar
            'calendar': CalendarFakeDb.data,

            // E-Commerce
            'e-commerce-dashboard': ECommerceFakeDb.dashboard,
            'e-commerce-products' : ECommerceFakeDb.products,
            'e-commerce-orders'   : ECommerceFakeDb.orders,

            // Academy
            'academy-categories': AcademyFakeDb.categories,
            'academy-courses'   : AcademyFakeDb.courses,
            'academy-course'    : AcademyFakeDb.course,

            // Mail
            'mail-mails'  : MailFakeDb.mails,
            'mail-folders': MailFakeDb.folders,
            'mail-filters': MailFakeDb.filters,
            'mail-labels' : MailFakeDb.labels,

            // Chat
            'chat-contacts': ChatFakeDb.contacts,
            'chat-chats'   : ChatFakeDb.chats,
            'chat-user'    : ChatFakeDb.user,

            // File Manager
            'file-manager': FileManagerFakeDb.files,

            // Contacts
            'contacts-contacts': ContactsFakeDb.contacts,
            'contacts-user'    : ContactsFakeDb.user,

            // Todo
            'todo-todos'  : TodoFakeDb.todos,
            'todo-filters': TodoFakeDb.filters,
            'todo-tags'   : TodoFakeDb.tags,

            // Scrumboard
            'scrumboard-boards': ScrumboardFakeDb.boards,

            // Invoice
            'invoice': InvoiceFakeDb.invoice,

            // Profile
            'profile-timeline'     : ProfileFakeDb.timeline,
            'profile-photos-videos': ProfileFakeDb.photosVideos,
            'profile-about'        : ProfileFakeDb.about,

            // Search
            'search-classic': SearchFakeDb.classic,
            'search-table'  : SearchFakeDb.table,

            // FAQ
            'faq': FaqFakeDb.data,

            // Knowledge base
            'knowledge-base': KnowledgeBaseFakeDb.data,

            // Icons
            'icons': IconsFakeDb.icons,

            // Quick Panel
            'quick-panel-notes' : QuickPanelFakeDb.notes,
            'quick-panel-events': QuickPanelFakeDb.events
        };
    }
}
