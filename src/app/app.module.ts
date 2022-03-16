import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BackendService} from './backend.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () => import('./detail-view/detail-view.module').then(m => m.DetailViewModule)
      },
      {
        path: 'details',
        loadChildren: () => import('./detail-view/detail-view.module').then(m => m.DetailViewModule)
      },
    ])
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
