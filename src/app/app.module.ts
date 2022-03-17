import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TicketsEffects, ticketReducers } from './data-access/ticket';
import { UserEffects, userReducers } from './data-access/user';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () => import('./list-view/list-view.module').then(m => m.ListViewModule)
      },
      {
        path: 'ticket',
        loadChildren: () => import('./detail-view/detail-view.module').then(m => m.DetailViewModule)
      },
    ]),
    StoreModule.forRoot({ tickets: ticketReducers, users: userReducers }),
    EffectsModule.forRoot([ TicketsEffects, UserEffects ]),
    StoreDevtoolsModule.instrument(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
