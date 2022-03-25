import {createAction, props} from "@ngrx/store";
import {Ticket} from "./state";
import {User} from "../user/state";

export const loadAllTickets = createAction(
    '[Page Load] Load all tickets',
)

export const createTicket = createAction(
    '[List View] Create new ticket',
    props<{ description: string }>()
)

export const completeTicket = createAction(
    '[Details View] Complete ticket',
    props<{ ticketId: Ticket['id'] }>()
)

export const ticketCompleted = createAction(
    '[Ticket Effects] Completed ticket',
    props<{ ticket: Ticket }>()
)

export const assignTicket = createAction(
    '[Details View] Assign ticket',
    props<{ ticketId: Ticket['id'], assigneeId: User['id'] }>()
)

export const allTicketsLoaded = createAction(
    '[Load Tickets Effect] All tickets loaded',
    props<{ tickets: Ticket[] }>()
)

export const ticketCreated = createAction(
    '[Create Ticket Effect] Ticket created',
    props<{ ticket: Ticket }>()
)

export const errorLoadingTickets = createAction(
    '[Load Ticket Effect] Error loading tickets',
    props<{ error: string }>()
)

export const errorCreatingTicket = createAction(
    '[Create Ticket Effect] Error creating ticket',
    props<{ error: string }>()
)

export const errorCompletingTicket = createAction(
    '[Complete Ticket Effect] Error completing ticket',
    props<{ error: string, ticketId: Ticket['id'] }>()
)
