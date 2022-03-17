import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTicketListLoading, ticketsSelector, TicketActions } from '../data-access/ticket';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent {
  loading$ = this.store.select(selectTicketListLoading);
  tickets$ = this.store.select(ticketsSelector.selectAll);
  showForm$ = new BehaviorSubject(false);

  vm$ = combineLatest([this.loading$, this.tickets$, this.showForm$]).pipe(
    map(([loading, tickets, showForm]) => ({ loading, tickets, showForm }))
  );

  form = this.fb.group({
    description: [null, Validators.required],
  });

  constructor(private store: Store, private fb: FormBuilder) { }

  createNewTicket(form: FormGroup) {
    if (form.invalid) {
      return;
    }

    const description = form.value.description;
    this.store.dispatch(TicketActions.createTicket({ description }));
    this.form.reset();
  }

  showNewTicketForm(show: boolean) {
    this.showForm$.next(show);
  }
}
