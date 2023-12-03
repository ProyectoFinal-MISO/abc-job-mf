
import { FindCandidateComponent } from './find-candidate/find-candidate.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { ViewOfferComponent } from './view-offer/view-offer.component';
import { DataViewModule } from 'primeng/dataview';

@NgModule({
  declarations: [
    FindCandidateComponent,
    ViewOfferComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    MultiSelectModule,
    DataViewModule
  ],
  exports: [
    FindCandidateComponent,
    ViewOfferComponent
  ]
})
export class CandidateModule { }
