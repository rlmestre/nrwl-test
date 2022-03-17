import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TicketActions } from './data-access/ticket';
import { UserActions } from './data-access/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(TicketActions.loadAllTickets());
    this.store.dispatch(UserActions.loadAllUsers());
  }
}
