import { CalendarEventModel, Event } from './events.state.model';
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
    constructor(public readonly payload: {event: Event}) {}
  }

  export class UpdateEventSuccess {
    static readonly type = '[Events] Update Events Success';
    constructor(public readonly payload: { event: Event }) {}
  }

  export class UpdateEventFail {
    static readonly type = '[Events] Update Events Fail';
    constructor(public readonly payload?: any) {}
  }

  //ADD EVENT
  export class AddEvent {
    static readonly type = '[Events] Add Event';
    constructor(public readonly payload: CalendarEventModel) {}
  }

  export class AddEventSuccess {
    static readonly type = '[Events] Add Event Success';
    constructor(public readonly payload: CalendarEventModel) {}
  }

  export class AddEventFail {
    static readonly type = '[Events] Add Event Fail';
    constructor(public readonly payload?: any) {}
  }

  //USER REQUEST REGISTER FOR EVENT
  export class EventRequestRegister {
    static readonly type = '[Events] Event Request Register';
    constructor(public readonly payload: Event) {}
  }

  export class EventRequestRegisterSuccess {
    static readonly type = '[Events] Event Request Register Success';
    constructor(public readonly payload: Event) {}
  }

  export class EventRequestRegisterFail {
    static readonly type = '[Events] Event Request Register Fail';
    constructor(public readonly payload?: any) {}
  }

  //OIC OR ADMIN ACCEPT REQUEST FOR REGISTER

  export class EventAcceptRegisterRequest {
    static readonly type = '[Events] Event Accept Register Request';
    constructor(public readonly payload: { event: Event, userId: string }) {}
  }

  export class EventAcceptRegisterRequestSuccess {
    static readonly type ='[Events] Event Accept Register Request Success';
    constructor(public readonly payload: { event: Event, userId: string }) {}
  }

  export class EventAcceptRegisterRequestFail {
    static readonly type ='[Events] Event Accept Register Request Fail';
    constructor(public readonly payload?: any) {}
  } 

  //self unregister or ADMIN/OIC remove from signedUp/pending
  export class EventRemoveSignUpOrPending {
    static readonly type = '[Events] Event Remove Signup Or Pending';
    constructor(public readonly payload: { event: Event, userId: string }) {}
  }

  export class EventRemoveSignUpOrPendingSuccess {
    static readonly type = '[Events] Event Remove Signup Or Pending Success';
    constructor(public readonly payload: { event: Event, userId: string }) {}
  }

  export class EventRemoveSignUpOrPendingFail {
    static readonly type = '[Events] Event Remove Signup Or Pending Fail';
    constructor(public readonly payload?: any) {}
  }

  //Delete event
  export class EventRemove {
    static readonly type = '[Events] Event Remove';
    constructor(public readonly payload: { event: Event }) {}
  }

  export class EventRemoveSuccess {
    static readonly type = '[Events] Event Remove Success';
    constructor(public readonly payload: { event: Event }) {}
  }

  export class EventRemoveFail {
    static readonly type = '[Events] Event Remove Fail';
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
    | AddEventSuccess
    | EventRequestRegister
    | EventRequestRegisterSuccess
    | EventRequestRegisterFail
    | EventAcceptRegisterRequest
    | EventAcceptRegisterRequestSuccess
    | EventAcceptRegisterRequestFail
    | EventRemoveSignUpOrPending
    | EventRemoveSignUpOrPendingSuccess
    | EventRemoveSignUpOrPendingFail
    | EventRemove
    | EventRemoveSuccess
    | EventRemoveFail;