import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewComponent } from './list-view.component';
import { RouterModule } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ListViewComponent }
    ]),
    ReactiveComponentModule,
    ReactiveFormsModule
  ]
})
export class ListViewModule { }
