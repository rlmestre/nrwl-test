import { TicketsEffects } from './effects';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { BackendService } from '../backend.service';
import * as TicketActions from './actions';
import { take } from 'rxjs/operators';
import { Ticket } from './state';

describe('TicketEffects', () => {
    let effects: TicketsEffects;
    let actions: Observable<Action>;
    let mockBackend: jasmine.SpyObj<BackendService>;

    beforeEach(() => {
        mockBackend = jasmine.createSpyObj(['tickets', 'newTicket']);

        TestBed.configureTestingModule({
            providers: [
                TicketsEffects,
                provideMockActions(() => actions),
                {
                    provide: BackendService,
                    useValue: mockBackend,
                },
            ],
        });

        effects = TestBed.inject(TicketsEffects);
    });

    it('should load tickets on loadAllTickets action', async () => {
        const tickets = [{ id: 1 }] as Ticket[];
        mockBackend.tickets.and.returnValue(of(tickets));

        actions = of(TicketActions.loadAllTickets());
        const result = await effects.loadTickets$.pipe(take(1)).toPromise();

        expect(result).toEqual(TicketActions.allTicketsLoaded({ tickets }));
    });

    it('should handle errors loading tickets on loadAllTickets action', async () => {
        mockBackend.tickets.and.returnValue(throwError('error'));

        actions = of(TicketActions.loadAllTickets());
        const result = await effects.loadTickets$.pipe(take(1)).toPromise();

        expect(result).toEqual(TicketActions.errorLoadingTickets({ error: 'Error loading tickets' }));
    });
});
