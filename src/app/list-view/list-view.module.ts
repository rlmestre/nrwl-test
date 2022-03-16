import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewComponent } from './list-view.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ListViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ListViewComponent }
    ])
  ]
})
export class ListViewModule { }
