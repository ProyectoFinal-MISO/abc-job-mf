import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EvaluationListComponent } from './evaluations-list/evaluations-list.component';
import { EvaluationCreateComponent } from'./evaluations-create/evaluations-create.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    NgbModule
  ],
  declarations: [
    EvaluationListComponent,
    EvaluationCreateComponent
  ],
  exports: [
    EvaluationListComponent,
    EvaluationCreateComponent
  ]
})
export class EvaluationModule { }
