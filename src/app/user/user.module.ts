import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnicalResourceCreateComponent } from './technical-resource/technical-resource-create/technical-resource-create.component';
import { CompanyCreateComponent } from './company/company-create/company-create.component';
import { EmployeeCreateComponent } from './employee/employee-create/employee-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    EmployeeCreateComponent,
    TechnicalResourceCreateComponent,
    CompanyCreateComponent
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
