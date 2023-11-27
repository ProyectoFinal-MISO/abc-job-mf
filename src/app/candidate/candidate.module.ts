
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

@NgModule({
  declarations: [
    FindCandidateComponent
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
    MultiSelectModule
  ],
  exports: [
    FindCandidateComponent
  ]
})
export class CandidateModule { }
