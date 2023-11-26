import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EvaluationListCompanyComponent } from './evaluations-list-company/evaluations-list-company.component';
import { EvaluationCreateCompanyComponent } from'./evaluations-create-company/evaluations-create-company.component';

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
    EvaluationListCompanyComponent,
    EvaluationCreateCompanyComponent
  ],
  exports: [
    EvaluationListCompanyComponent,
    EvaluationCreateCompanyComponent
  ]
})
export class EvaluationModule { }
