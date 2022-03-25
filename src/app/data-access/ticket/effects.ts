import {Injectable} from "@angular/core";
import { EMPTY, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import {Actions, createEffect, ofType} from "@ngrx/effects";

import {BackendService} from "../backend.service";
import * as TicketActions from "./actions";

@Injectable()
export class TicketsEffects {
    constructor(private actions$: Actions, private backend: BackendService) {};

    loadTickets$ = createEffect(() => this.actions$.pipe(
        ofType(TicketActions.loadAllTickets),
        switchMap(() => this.backend.tickets().pipe(
            map(tickets => TicketActions.allTicketsLoaded({ tickets })),
            catchError(() => of(
                TicketActions.errorLoadingTickets({ error: 'Error loading tickets' }))
            ))
        ))
    );

    newTicket$ = createEffect(() => this.actions$.pipe(
        ofType(TicketActions.createTicket),
        switchMap(({ description }) => this.backend.newTicket({ description }).pipe(
            map((ticket) => TicketActions.ticketCreated({ ticket })),
            catchError(() => of(
                TicketActions.errorCreatingTicket({ error: 'Error creating ticket' })
            ))
        ))
    ))

    completeTicket$ = createEffect(() => this.actions$.pipe(
        ofType(TicketActions.completeTicket),
        switchMap(({ ticketId }) => this.backend.complete(ticketId, true).pipe(
            map((ticket) => TicketActions.ticketCompleted({ ticket })),
            catchError(() => of(
                TicketActions.errorCompletingTicket({ error: 'Error completing ticket', ticketId })
            ))
        ))
    ))
}
