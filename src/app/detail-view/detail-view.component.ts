import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { selectTicketById, selectTicketListLoading, Ticket, TicketActions } from '../data-access/ticket';
import { ActivatedRoute } from '@angular/router';
import { concatMap, filter, map, switchMap } from 'rxjs/operators';
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
      filter((ticket) => !!ticket?.assigneeId),
      concatMap((ticket) =>
          this.store.select(selectUserById(ticket.assigneeId)) as Observable<User>
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
