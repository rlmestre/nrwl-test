import {createReducer, on} from "@ngrx/store";
import * as TicketActions from "./actions";
import {ticketAdapter, initialTicketsState} from "./state";

export const ticketReducers = createReducer(
    initialTicketsState,
    on(TicketActions.loadAllTickets, (state) => ({ ...state, loading: true })),
    on(TicketActions.allTicketsLoaded, (state, action) =>
        ticketAdapter.setAll(action.tickets, { ...state, loading: false, error: '' })
    ),
    on(TicketActions.errorLoadingTickets, (state, { error }) =>
        ticketAdapter.setAll([], { ...state, loading: false, error })
    ),
    on(TicketActions.createTicket, (state, action) =>
        ticketAdapter.addOne({
            id: state.ids.length,
            description: action.description,
            assigneeId: null,
            completed: false,
        }, state)
    ),
    on(TicketActions.completeTicket, (state, action) =>
        ticketAdapter.updateOne({
            id: action.ticketId,
            changes: {
                completed: true
            },
        }, state)
    ),
    on(TicketActions.errorCompletingTicket, (state, action) =>
        ticketAdapter.updateOne({
            id: action.ticketId,
            changes: {
                completed: false
            },
        }, {
            ...state,
            error: action.error
        })
    ),
    on(TicketActions.ticketCompleted, (state, action) =>
        ticketAdapter.updateOne({
            id: action.ticket.id,
            changes: {
                ...action.ticket
            },
        }, state)
    ),
    on(TicketActions.assignTicket, (state, action) =>
        ticketAdapter.updateOne({
            id: action.ticketId,
            changes: {
                assigneeId: action.assigneeId,
            },
        }, state)
    ),
);
