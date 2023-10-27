import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnicalResourceCreateComponent } from './technical-resource/technical-resource-create/technical-resource-create.component';
import { CompanyCreateComponent } from './company/company-create/company-create.component';
import { EmployeeCreateComponent } from './employee/employee-create/employee-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { AcademicDataComponent } from './academic-data/academic-data.component';

@NgModule({
  declarations: [
    EmployeeCreateComponent,
    TechnicalResourceCreateComponent,
    CompanyCreateComponent,
    AcademicDataComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EmployeeCreateComponent,
    TechnicalResourceCreateComponent,
    CompanyCreateComponent
  ]
})
export class UserModule { }
