import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnicalResourceCreateComponent } from './technical-resource/technical-resource-create/technical-resource-create.component';
import { CompanyCreateComponent } from './company/company-create/company-create.component';
import { EmployeeCreateComponent } from './employee/employee-create/employee-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { AcademicInformationComponent } from './academic-information/academic-information.component';

@NgModule({
  declarations: [
    EmployeeCreateComponent,
    TechnicalResourceCreateComponent,
    CompanyCreateComponent,
    AcademicInformationComponent
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
    CompanyCreateComponent,
    AcademicInformationComponent
  ]
})
export class UserModule { }
