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

export type CalendarEventActions = 
    | LoadEvents
    | LoadEventsSuccess
    | LoadEventsFail;