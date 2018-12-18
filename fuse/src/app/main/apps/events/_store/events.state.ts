
import { Action, Selector, State, StateContext, NgxsOnInit } from '@ngxs/store';
import { tap, catchError, map } from 'rxjs/operators';
import { CalendarEventStateModel, CalendarEventModel, Event, CalendarEvent } from './events.state.model';
import { EventService } from '../events.service';
import * as eventActions from './events.actions';
import { asapScheduler, of } from 'rxjs';

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
    constructor (private _eventService: EventService) {}

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
        console.log(payload);
        patchState({ loaded: false, loading: false });
    }

    @Action(eventActions.EventRequestRegister)
    eventRequestRegister(
        { patchState, dispatch }: StateContext<CalendarEventStateModel>   
    ) {
        
    }
}