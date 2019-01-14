import { CalendarEventAction } from 'angular-calendar';

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
    isDeleted                   : boolean;
}

export interface CalendarEventModel {
    start   : Date;
    end     : Date;
    title   : string;

    color: {
        primary     : string;
        secondary   : string;
    };

    actions?: CalendarEventAction[];
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    cssClass?: any;
    meta?: { event: Event };
};

export interface CalendarEventStateModel {
    events:  CalendarEventModel[];
    loaded: boolean;
    loading: boolean;
    selectedEventId: string;
};

export class CalendarEvent implements CalendarEventModel {
    start   : Date;
    end     : Date;
    title   : string;

    color: {
        primary     : string;
        secondary   : string;
    };

    actions?: CalendarEventAction[];
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    cssClass?: any;
    meta?: { event: Event };

    constructor(event: Event, opts?: any)
    {
        event = event || null;
        opts = opts || {};
        this.start = new Date(event.date[0]);
        this.end  = new Date(event.date[1]);

        event.date[0] = new Date(event.date[0]);
        event.date[1]  = new Date(event.date[1]);

        this.title = event.name || '';
        this.color = {
            primary  : opts.color && opts.color.primary || '#1e90ff',
            secondary: opts.color && opts.color.secondary || '#D1E8FF'
        };
        this.draggable = opts.draggable || false;
        this.resizable = {
            beforeStart: opts.resizable && opts.resizable.beforeStart || true,
            afterEnd   : opts.resizable && opts.resizable.afterEnd || true
        };
        this.actions = opts.actions || [];
        this.cssClass = opts.cssClass || '';
        
        if (event.additionalDetails && typeof event.additionalDetails !== "object") {
            event.additionalDetails = JSON.parse(event.additionalDetails);
		}	
        
        this.meta = {
            event : event
        };
    }

}
