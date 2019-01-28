
import { Action, Selector, State, StateContext, NgxsOnInit, Store } from '@ngxs/store';
import { tap, catchError, map } from 'rxjs/operators';
import { CalendarEventStateModel, CalendarEventModel, Event, CalendarEvent } from './events.state.model';
import { EventService } from '../events.service';
import { TokenAuthService } from '@core/auth/tokenAuth.service';
import * as eventActions from './events.actions';
import { asapScheduler, of } from 'rxjs';
import { UserEventSignup, UserEventRemove } from '@core/store/users/users.actions';

@State<CalendarEventStateModel>({
    name: 'calendarEvents',
    defaults: {
        events: [],
        loaded: false,
        loading: false,
        selectedEventId: null
    }
  })
  export class CalendarEventState implements NgxsOnInit {
    constructor (private _eventService: EventService,
                 private _tokenService: TokenAuthService,
                 private _store: Store) {}

    ngxsOnInit(ctx: StateContext<CalendarEventStateModel>) {
        ctx.dispatch(new eventActions.LoadEvents());
    }

    @Selector()
    static calendarEvents(state: CalendarEventStateModel) {
        return state.events;
    }

    @Selector()
    static loaded(state: CalendarEventStateModel) {
        return state.loaded;
    }

    @Selector()
    static SelectedEvent(state: CalendarEventStateModel): CalendarEventModel {
      return state.events.find(
        (calendarEvent: CalendarEventModel) => calendarEvent.meta.event._id === state.selectedEventId
      );
    }

    @Action(eventActions.LoadEvents)
    loadEvents({ patchState, dispatch }: StateContext<CalendarEventStateModel>) {
        patchState({ loading: true });
        return this._eventService.getEvents()
                 .map((dbEvents: Event[]) => {
                     let theEvents : CalendarEventModel[] = dbEvents.map(item => {
                         return new CalendarEvent(item);
                     });
                    asapScheduler.schedule(() =>
                        dispatch(new eventActions.LoadEventsSuccess(theEvents))
                    )
                 },
                catchError(error  => 
                    of(
                        asapScheduler.schedule(() =>
                        dispatch(new eventActions.LoadEventsFail(error))
                    )
                )
            )
        );
    }

    @Action(eventActions.LoadEventsSuccess)
    loadEventsSuccess(
        { patchState }: StateContext<CalendarEventStateModel>,
        { payload }: eventActions.LoadEventsSuccess
    ) {
        patchState({ events: payload, loaded: true, loading: false });
    }

    @Action(eventActions.LoadEventsFail)
    loadEventsFail(
        { patchState }: StateContext<CalendarEventStateModel>,
        { payload }: eventActions.LoadEventsFail
    ) {
        console.log(payload);
        patchState({ loaded: false, loading: false });
    }


    @Action(eventActions.AddEvent)
    addEvent({ patchState, dispatch }: StateContext<CalendarEventStateModel>, { payload }: eventActions.AddEvent) {
    patchState({ loading: true });
       return this._eventService.create(payload.meta.event)
            .subscribe(data => {
                asapScheduler.schedule(() =>
                    dispatch(new eventActions.AddEventSuccess(new CalendarEvent(data)))
                )
            }, 
            error => {
                asapScheduler.schedule(() =>
                    dispatch(new eventActions.AddEventFail(error.message))
                ) 
            });
    }

    @Action(eventActions.AddEventSuccess)
    addEventSuccess(
        { patchState, getState } : StateContext<CalendarEventStateModel>,
        { payload }: eventActions.AddEventSuccess
    ) {
        const state = getState();
        patchState({
            events: [...state.events, payload],
            loaded: true, 
            loading: false
        });
    }

    @Action(eventActions.AddEventFail)
    addEventFail(
        { patchState }: StateContext<CalendarEventStateModel>,
        { payload }: eventActions.AddEventFail
    ) {
        patchState({ loaded: false, loading: false });
    }

    @Action(eventActions.EventRequestRegister)
    eventRequestRegister(
        { patchState, dispatch }: StateContext<CalendarEventStateModel>,
        { payload } : eventActions.EventRequestRegister   
    ) {
        if(!this._tokenService.isAuthenticated()) { //maybe some other checks here too
            asapScheduler.schedule(() =>
            dispatch(new eventActions.EventRequestRegisterFail("Must be Authenticated"))
        )
            return;
        }

        patchState({ loaded: false, loading: true });
        let event = this._eventService.preProcessEvent(payload);

        //first see if we should even allow signups
        if(!this._eventService.isSpotsLeft(event) || event.isClosed) {
            //dispatch fail, signups are full or disabled
            asapScheduler.schedule(() =>
                dispatch(new eventActions.EventRequestRegisterFail("Signups are full or disabled"))
            )
            return;
        }

        //To ensure we aren't adding any duplicates
        if(event.pending.indexOf(this._tokenService.getCurrUserId()) > -1 ||
            event.signedUp.indexOf(this._tokenService.getCurrUserId()) > -1) {
            //dispatch fail, already requested signup
            asapScheduler.schedule(() =>
            dispatch(new eventActions.EventRequestRegisterFail("Already Pending or Signed Up"))
        )
            return;
        }
        //otherwise add the user
        event.pending.push(this._tokenService.getCurrUserId());
        return this._eventService.update(event, true)
            .subscribe(data => {
                asapScheduler.schedule(() =>
                    dispatch(new eventActions.EventRequestRegisterSuccess((data)))
                )
            },
            error => {
                asapScheduler.schedule(() =>
                    dispatch(new eventActions.EventRequestRegisterFail(error.message))
                )    
            });
    }

    @Action(eventActions.EventRequestRegisterSuccess)
    eventRequestRegisterSuccess(
        { patchState, getState, dispatch } : StateContext<CalendarEventStateModel>,
        { payload }: eventActions.EventRequestRegisterSuccess
    ) {
        const state = getState();
        let index = state.events.findIndex(x => x.meta.event._id === payload._id);

        if(index > -1) {
            patchState({
                events: [...state.events.slice(0, index), 
                        new CalendarEvent(payload), 
                        ...state.events.slice(index+1)],
                loaded: true, 
                loading: false
            });
           
        } else {
            //dispatch fail
            asapScheduler.schedule(() =>
            dispatch(new eventActions.EventRequestRegisterFail("Failed to update"))
        )
            return;
        }
    }

    @Action(eventActions.EventRequestRegisterFail)
    eventRequestRegisterFail(
        { patchState }: StateContext<CalendarEventStateModel>,
        { payload }: eventActions.EventRequestRegisterFail
    ) {
        console.log(payload);
        patchState({ loaded: false, loading: false });
    }

    @Action(eventActions.EventAcceptRegisterRequest)
    eventAcceptRegisterRequest(
        { patchState, dispatch }: StateContext<CalendarEventStateModel>,
        { payload }: eventActions.EventAcceptRegisterRequest
    ) {
        if(!this._tokenService.isAuthenticated()) {
            //must be logged in
            asapScheduler.schedule(() =>
            dispatch(new eventActions.EventAcceptRegisterRequestFail("Must be Authenticated"))
        )
            return;
        }

        //must be an admin or assigned OIC to access this
        if(!this._tokenService.isAdmin() || this._eventService.isOIC(payload.event)) {
            asapScheduler.schedule(() =>
            dispatch(new eventActions.EventAcceptRegisterRequestFail("Must be Authorized"))
        )
            return;   
        }

        //first see if we should even allow signups
        if(!this._eventService.isSpotsLeft(payload.event) || payload.event.isClosed) {
            //dispatch fail, signups are full or disabled
             asapScheduler.schedule(() =>
                dispatch(new eventActions.EventRequestRegisterFail("Signups are full or disabled"))
            )
            return;
        }

        //otherwise, we can do this
        patchState({ loaded: false, loading: true });
        let event = this._eventService.preProcessEvent(payload.event);

        //make sure the requested id is in pending
        let index = event.pending.indexOf(payload.userId);
        if(index > -1) {
            //for the sake of possibility of duplicates we will use a Set
            let idSet = new Set(event.signedUp);
            idSet.add(payload.userId);
            event.signedUp = Array.from(idSet);
            //remove id from pending
            event.pending.splice(index, 1);

            return this._eventService.update(event, true)
                .subscribe(data => {
                    asapScheduler.schedule(() =>
                        dispatch(new eventActions.EventAcceptRegisterRequestSuccess(({ event: data, userId: payload.userId })))
                    )
                },
                error => {
                    asapScheduler.schedule(() =>
                        dispatch(new eventActions.EventAcceptRegisterRequestFail(error.message))
                    )    
                });
        } else {
            asapScheduler.schedule(() =>
                dispatch(new eventActions.EventAcceptRegisterRequestFail("Not in Pending"))
            )   
        }
    }

    @Action(eventActions.EventAcceptRegisterRequestSuccess)
    EventAcceptRegisterRequestSuccess(
        { patchState, getState, dispatch } : StateContext<CalendarEventStateModel>,
        { payload }: eventActions.EventAcceptRegisterRequestSuccess
    ) {
        const state = getState();
        let index = state.events.findIndex(x => x.meta.event._id === payload.event._id);


        if(index > -1) {
            patchState({
                events: [...state.events.slice(0, index), 
                        new CalendarEvent(payload.event), 
                        ...state.events.slice(index+1)],
                loaded: true, 
                loading: false
            });

            //dispatch to make user reflect that they are signed up for event
           this._store.dispatch(new UserEventSignup({ eventId: payload.event._id, userId: payload.userId }));
        } else {
            //dispatch fail
            asapScheduler.schedule(() =>
            dispatch(new eventActions.EventRequestRegisterFail("Failed to update"))
        )
            return;
        }
    }

    @Action(eventActions.EventRequestRegisterFail)
    EventAcceptRegisterRequestFail(
        { patchState }: StateContext<CalendarEventStateModel>,
        { payload }: eventActions.EventRequestRegisterSuccess
    ) {
        console.log(payload);
        patchState({ loaded: false, loading: false });
    }

    @Action(eventActions.EventRemoveSignUpOrPending)
    eventRemoveSignUpOrPending(
        { patchState, dispatch }: StateContext<CalendarEventStateModel>,
        { payload }: eventActions.EventRemoveSignUpOrPending
    ) {
        if(!this._tokenService.isAuthenticated()) {
            //must be logged in
            asapScheduler.schedule(() =>
            dispatch(new eventActions.EventRemoveSignUpOrPendingFail("Must be Authenticated"))
        )
            return;
        }

        //must be an admin or assigned OIC to access this
        if(!this._tokenService.isAdmin() || this._eventService.isOIC(payload.event)) {
            asapScheduler.schedule(() =>
            dispatch(new eventActions.EventRemoveSignUpOrPendingFail("Must be Authorized"))
        )
            return;   
        }

        patchState({ loaded: false, loading: true });
        let event = this._eventService.preProcessEvent(payload.event);

        let pendingIndex = event.pending.indexOf(payload.userId);
        let signedUpIndex = event.signedUp.indexOf(payload.userId);
       
        if(pendingIndex > -1) {
            event.pending.splice(pendingIndex, 1);
        } else if(signedUpIndex > -1) {
            event.signedUp.splice(signedUpIndex, 1);
        } else {
            asapScheduler.schedule(() =>
                dispatch(new eventActions.EventRemoveSignUpOrPendingFail("Not signed up or in pending"))
            )
            return;
        }

        return this._eventService.update(event, true)
            .subscribe(data => {
                asapScheduler.schedule(() =>
                    dispatch(new eventActions.EventRemoveSignUpOrPendingSuccess(({ event: data, userId: payload.userId })))
                )
            },
            error => {
                asapScheduler.schedule(() =>
                    dispatch(new eventActions.EventRemoveSignUpOrPendingFail(error.message))
                )    
            });
    }

    @Action(eventActions.EventRemoveSignUpOrPendingSuccess)
    eventRemoveSignUpOrPendingSuccess(
        { patchState, getState, dispatch } : StateContext<CalendarEventStateModel>,
        { payload }: eventActions.EventRemoveSignUpOrPendingSuccess
    ) {
        const state = getState();
        let index = state.events.findIndex(x => x.meta.event._id === payload.event._id);


        if(index > -1) {
            patchState({
                events: [...state.events.slice(0, index), 
                        new CalendarEvent(payload.event), 
                        ...state.events.slice(index+1)],
                loaded: true, 
                loading: false
            });

            //dispatch to make user reflect that they removed from event
           this._store.dispatch(new UserEventRemove({ eventId: payload.event._id, userId: payload.userId }));
        } else {
            //dispatch fail
            asapScheduler.schedule(() =>
            dispatch(new eventActions.EventRemoveSignUpOrPendingFail("Failed to update"))
        )
            return;
        }
    }

    @Action(eventActions.EventRemoveSignUpOrPendingFail)
    eventRemoveSignUpOrPendingFail(
        { patchState }: StateContext<CalendarEventStateModel>,
        { payload }: eventActions.EventRemoveSignUpOrPendingFail
    ) {
        console.log(payload);
        patchState({ loaded: false, loading: false });
    }

    @Action(eventActions.UpdateEvent)
    updateEvent(
        { patchState, dispatch }: StateContext<CalendarEventStateModel>,
        { payload }: eventActions.UpdateEvent
    ) {
        if(!this._tokenService.isAuthenticated()) {
            //must be logged in
            asapScheduler.schedule(() =>
            dispatch(new eventActions.UpdateEventFail("Must be Authenticated"))
        )
            return;
        }

        //must be an admin or assigned OIC to access this
        if(!this._tokenService.isAdmin() || this._eventService.isOIC(payload.event)) {
            asapScheduler.schedule(() =>
            dispatch(new eventActions.UpdateEventFail("Must be Authorized"))
        )
            return;   
        }

        patchState({ loaded: false, loading: true });
        let event = this._eventService.preProcessEvent(payload.event);

        return this._eventService.update(event, true)
        .subscribe(data => { 
            asapScheduler.schedule(() =>
                dispatch(new eventActions.UpdateEventSuccess(({event: data as Event})))
            )
        },
        error => {
            asapScheduler.schedule(() =>
                dispatch(new eventActions.UpdateEventFail(error.message))
            )    
        });
    }

    @Action(eventActions.UpdateEventSuccess)
    updateEventSuccess(
        { patchState, getState, dispatch } : StateContext<CalendarEventStateModel>,
        { payload }: eventActions.UpdateEventSuccess
    ) {
        const state = getState();        
        let index = state.events.findIndex(x => x.meta.event._id === payload.event._id);

        if(index > -1) {
            patchState({
                events: [...state.events.slice(0, index), 
                        new CalendarEvent(payload.event), 
                        ...state.events.slice(index+1)],
                loaded: true, 
                loading: false
            });

       } else {
            //dispatch fail
            asapScheduler.schedule(() =>
            dispatch(new eventActions.UpdateEventFail("Failed to update"))
        )
            return;
        }
    }

    @Action(eventActions.UpdateEventFail)
    updateEventFail(
        { patchState }: StateContext<CalendarEventStateModel>,
        { payload }: eventActions.UpdateEventFail
    ) {
        console.log(payload);
        patchState({ loaded: false, loading: false });
    }

    @Action(eventActions.EventRemove)
    eventRemove(
        { patchState, dispatch }: StateContext<CalendarEventStateModel>,
        { payload }: eventActions.EventRemove
    ) {
        if(!this._tokenService.isAuthenticated()) {
            //must be logged in
            asapScheduler.schedule(() =>
            dispatch(new eventActions.EventRemoveFail("Must be Authenticated"))
        )
            return;
        }

        //must be an admin or assigned OIC to access this
        if(!this._tokenService.isAdmin()) {
            asapScheduler.schedule(() =>
            dispatch(new eventActions.EventRemoveFail("Must be Authorized"))
        )
            return;   
        }

        patchState({ loaded: false, loading: true });
        let event = this._eventService.preProcessEvent(payload.event);

        return this._eventService.delete(event)
        .subscribe(data => { 
            asapScheduler.schedule(() =>
                dispatch(new eventActions.EventRemoveSuccess(({event: data as Event})))
            )
        },
        error => {
            asapScheduler.schedule(() =>
                dispatch(new eventActions.EventRemoveFail(error.message))
            )    
        });
    }
    

    @Action(eventActions.EventRemoveSuccess)
    eventRemoveSuccess(
        { patchState, getState, dispatch } : StateContext<CalendarEventStateModel>,
        { payload }: eventActions.EventRemoveSuccess
    ) {
        const state = getState();        
        let index = state.events.findIndex(x => x.meta.event._id === payload.event._id);

        if(index > -1) {
            patchState({
                events: [...state.events.slice(0, index),  
                        ...state.events.slice(index+1)],
                loaded: true, 
                loading: false
            });

        //remove event from all users histories that signed up
        let event = this._eventService.preProcessEvent(payload.event);
        for(let id of event.signedUp) {
            //dispatch all of the deletes
            asapScheduler.schedule(() =>
                dispatch(new UserEventRemove({ eventId: payload.event._id, userId: id }))
            )
        }            

       } else {
            //dispatch fail
            asapScheduler.schedule(() =>
            dispatch(new eventActions.EventRemoveFail("Failed to delete"))
        )
            return;
        }
    }

    @Action(eventActions.EventRemoveFail)
    eventRemoveFail(
        { patchState }: StateContext<CalendarEventStateModel>,
        { payload }: eventActions.EventRemoveFail
    ) {
        console.log(payload);
        patchState({ loaded: false, loading: false });
    }

}