import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { selectTicketById, selectTicketListLoading, Ticket, TicketActions } from '../data-access/ticket';
import { ActivatedRoute } from '@angular/router';
import { concatMap, delay, filter, map, switchMap, tap } from 'rxjs/operators';
import { selectUserById, User, usersSelector } from '../data-access/user';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent {
  readonly loading$ = this.store.select(selectTicketListLoading);

  private readonly ticket$ = this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => this.store.select(selectTicketById(id)) as Observable<Ticket>),
  );

  private readonly assignee$ = this.ticket$.pipe(
      // filter((ticket) => !!ticket?.assigneeId),
      switchMap((ticket) =>
          ticket
              ? this.store.select(selectUserById(ticket.assigneeId)) as Observable<User>
              : of(null)
      ),
  );

  private readonly users$ = this.store.select(usersSelector.selectAll);
  private readonly showForm$ = new BehaviorSubject(false);

  readonly vm$ = combineLatest([
      this.loading$,
      this.ticket$,
      this.assignee$,
      this.users$,
      this.showForm$,
  ]).pipe(
      filter((params) => params.every((param) => param != null)),
      map(([loading, ticket, assignee, users, showForm]) => ({
          loading,
          ticket,
          assignee,
          users,
          showForm,
      })),
  );

  constructor(private store: Store, private route: ActivatedRoute) {}

  assignTicket(ticketId: Ticket['id'], assigneeId: string) {
    this.store.dispatch(TicketActions.assignTicket({
      ticketId,
      assigneeId: Number(assigneeId)
    }));
    this.showForm$.next(false);
  }

  completeTicket(ticketId: Ticket['id']) {
    this.store.dispatch(TicketActions.completeTicket({ ticketId }));
  }

  showReassignForm(show: boolean) {
    this.showForm$.next(show);
  }
}
