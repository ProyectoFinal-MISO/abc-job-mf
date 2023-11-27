import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TechnicalTestListEmployeeComponent } from './technical-test-list-employee/technical-test-list-employee.component';
import { TechnicalTestCreateEmployeeComponent } from './technical-test-create-employee/technical-test-create-employee.component';
import { TechnicalTestListTechnicalResourceComponent } from './technical-test-list-technical-resource/technical-test-list-technical-resource.component';
import { TechnicalTestViewTechnicalResourceComponent } from './technical-test-view-technical-resource/technical-test-view-technical-resource.component';

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
    TechnicalTestListEmployeeComponent,
    TechnicalTestCreateEmployeeComponent,
    TechnicalTestListTechnicalResourceComponent,
    TechnicalTestViewTechnicalResourceComponent,
  ],
  exports: [
    TechnicalTestListEmployeeComponent,
    TechnicalTestCreateEmployeeComponent,
    TechnicalTestListTechnicalResourceComponent,
    TechnicalTestViewTechnicalResourceComponent,
  ]
})
export class TechnicalTestModule { }
