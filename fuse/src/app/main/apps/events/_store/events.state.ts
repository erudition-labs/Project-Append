
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
        { dispatch }: StateContext<CalendarEventStateModel>,
        { payload }: eventActions.LoadEventsFail
    ) {
        dispatch({ loaded: false, loading: false });
    }
}