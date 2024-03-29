import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicalResourceCreateComponent } from './technical-resource/technical-resource-create/technical-resource-create.component';
import { TechnicalResourceViewComponent } from './technical-resource/technical-resource-view/technical-resource-view.component';
import { TechnicalResourceDeleteComponent } from './technical-resource/technical-resource-delete/technical-resource-delete.component';

import { CompanyCreateComponent } from './company/company-create/company-create.component';
import { CompanyViewComponent } from './company/company-view/company-view.component';
import { CompanyDeleteComponent } from './company/company-delete/company-delete.component';

import { EmployeeCreateComponent } from './employee/employee-create/employee-create.component';
import { EmployeeViewComponent } from './employee/employee-view/employee-view.component';
import { EmployeeDeleteComponent } from './employee/employee-delete/employee-delete.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { AcademicInformationComponent } from './academic-information/academic-information.component';
import { ProfessionalExperienceComponent } from './professional-experience/professional-experience.component';
import { PersonalSkillComponent } from './personal-skill/personal-skill.component';
import { ProgrammingLanguageComponent } from './programming-language/programming-language.component';
import { LanguageComponent } from './language/language.component';
import { TechnicalResourceEditComponent } from './technical-resource/technical-resource-edit/technical-resource-edit.component';

@NgModule({
  declarations: [
    EmployeeCreateComponent,
    EmployeeViewComponent,
    EmployeeDeleteComponent,
    TechnicalResourceCreateComponent,
    TechnicalResourceViewComponent,
    TechnicalResourceDeleteComponent,
    CompanyCreateComponent,
    CompanyViewComponent,
    CompanyDeleteComponent,
    AcademicInformationComponent,
    ProfessionalExperienceComponent,
    PersonalSkillComponent,
    ProgrammingLanguageComponent,
    LanguageComponent,
    TechnicalResourceEditComponent
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
    EmployeeViewComponent,
    EmployeeDeleteComponent,
    TechnicalResourceCreateComponent,
    TechnicalResourceViewComponent,
    TechnicalResourceDeleteComponent,
    CompanyCreateComponent,
    CompanyViewComponent,
    CompanyDeleteComponent,
    AcademicInformationComponent,
    ProfessionalExperienceComponent,
    PersonalSkillComponent,
    ProgrammingLanguageComponent,
    LanguageComponent
  ]
})
export class UserModule { }
