import { CalendarEventModel } from './events.state.model';
// load Events actions
export class LoadEvents {
    static readonly type = '[Events] Load Events';
}

export class LoadEventsSuccess {
    static readonly type = '[Events] Load Events Success';
    constructor(public readonly payload: CalendarEventModel[]) {}
  }

  export class LoadEventsFail {
    static readonly type = '[Events] Load Events Fail';
    constructor(public readonly payload?: any) {}
  }

  //UPDATE
  export class UpdateEvent {
    static readonly type = '[Events] Update Event';
  }

  export class UpdateEventSuccess {
    static readonly type = '[Events] Load Events Success';
    constructor(public readonly payload: CalendarEventModel[]) {}
  }

  export class UpdateEventFail {
    static readonly type = '[Events] Load Events Fail';
    constructor(public readonly payload?: any) {}
  }

  //ADD EVENT

  export class AddEvent {
    static readonly type = '[Events] Add Event';
    constructor(public readonly payload: CalendarEventModel) {}
  }

  export class AddEventSuccess {
    static readonly type = '[Events] Add Events Success';
    constructor(public readonly payload: CalendarEventModel[]) {}
  }

  export class AddEventFail {
    static readonly type = '[Events] Add Events Fail';
    constructor(public readonly payload?: any) {}
  }

export type CalendarEventActions = 
    | LoadEvents
    | LoadEventsSuccess
    | LoadEventsFail
    | UpdateEvent
    | UpdateEventSuccess
    | UpdateEventFail
    | AddEvent
    | AddEventFail
    | AddEventSuccess;