import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailViewComponent } from './detail-view.component';
import { RouterModule } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';

@NgModule({
  declarations: [
    DetailViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: ':id', component: DetailViewComponent }
    ]),
    ReactiveComponentModule,
  ]
})
export class DetailViewModule { }
