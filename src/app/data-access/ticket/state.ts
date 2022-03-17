import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";

export interface Ticket {
    id: number;
    description: string;
    assigneeId: number;
    completed: boolean;
}

export interface TicketsState extends EntityState<Ticket> {
    loading?: boolean;
    error?: string;
}

export const ticketAdapter: EntityAdapter<Ticket> = createEntityAdapter<Ticket>();
export const initialTicketsState: TicketsState = ticketAdapter.getInitialState();

