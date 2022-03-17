import { createFeatureSelector, createSelector, defaultMemoize } from "@ngrx/store";
import {ticketAdapter, Ticket, TicketsState} from "./state";

export const selectTicketState = createFeatureSelector<TicketsState>('tickets');

export const ticketsSelector = ticketAdapter.getSelectors(selectTicketState)

export const selectTicketListLoading = createSelector(selectTicketState, (state: TicketsState) => state.loading);

// Alternative pattern to selectors with props without losing memoization
const _selectTicketById = (id: Ticket['id']) => createSelector(
    selectTicketListLoading,
    ticketsSelector.selectEntities,
    (loading, tickets) => loading ? null : (tickets[id] ?? {})
);

export const selectTicketById = (id: Ticket['id']) => defaultMemoize(_selectTicketById).memoized(id);
