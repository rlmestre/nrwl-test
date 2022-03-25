import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTicketListLoading, ticketsSelector, TicketActions } from '../data-access/ticket';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent {
  searchControl = this.fb.control('');

  loading$ = this.store.select(selectTicketListLoading);
  tickets$ = combineLatest([
      this.store.select(ticketsSelector.selectAll),
      this.searchControl.valueChanges.pipe(startWith(this.searchControl.value))
  ]).pipe(
      debounceTime(500),
      map(([tickets, searchValue]) => {
        console.log(tickets, searchValue)
        return tickets.filter((ticket) => ticket.description.includes(searchValue))
      })
  );
  showForm$ = new BehaviorSubject(false);

  vm$ = combineLatest([this.loading$, this.tickets$, this.showForm$]).pipe(
    map(([loading, tickets, showForm]) => ({ loading, tickets, showForm }))
  );

  form = this.fb.group({
    description: [null, Validators.required],
  });


  constructor(private store: Store, private fb: FormBuilder) {}

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
