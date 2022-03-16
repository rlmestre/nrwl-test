import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailViewComponent } from './detail-view.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DetailViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DetailViewComponent }
    ])
  ]
})
export class DetailViewModule { }
