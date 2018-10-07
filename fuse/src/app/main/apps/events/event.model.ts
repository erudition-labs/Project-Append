import { CalendarEventAction } from 'angular-calendar';
import { startOfDay, endOfDay } from 'date-fns';

export interface Event {
	_id							?: string;
	name 						: string;
	isVerificationRequired 		: boolean;
	isVerified 					: boolean;
	isClosed		 			: boolean;
	summary						: string;
	date 						: any[];
	OIC 						: any[];
	signedUp 					: any[];
	pending						: any[];
	additionalDetails			: string;
	spots						: number;
	author						: any;
}



export class CalendarEventModel
{
    start: Date;
    end?: Date;
    title: string;
    color: {
        primary: string;
        secondary: string;
    };
    actions?: CalendarEventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    meta?: {
        event : Event
    };

    /**
     * Constructor
     *
     * @param data
     */
    constructor(data?: Event, opts?: any)
    {
        data = data || null;
        this.start = new Date(data.date[0]) || startOfDay(new Date());
        this.end = new Date(data.date[1]) || endOfDay(new Date());
        this.title = data.name || '';
        this.color = {
            primary  : opts.color && opts.color.primary || '#1e90ff',
            secondary: opts.color && opts.color.secondary || '#D1E8FF'
        };
        this.draggable = opts.draggable || true;
        this.resizable = {
            beforeStart: opts.resizable && opts.resizable.beforeStart || true,
            afterEnd   : opts.resizable && opts.resizable.afterEnd || true
        };
        this.actions = opts.actions || [];
        this.allDay = opts.allDay || false;
        this.cssClass = opts.cssClass || '';
        this.meta = {
            event : data
        };
    }
}
