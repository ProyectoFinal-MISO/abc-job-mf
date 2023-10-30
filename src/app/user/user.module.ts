import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnicalResourceCreateComponent } from './technical-resource/technical-resource-create/technical-resource-create.component';
import { CompanyCreateComponent } from './company/company-create/company-create.component';
import { EmployeeCreateComponent } from './employee/employee-create/employee-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { AcademicInformationComponent } from './academic-information/academic-information.component';
import { ProfessionalExperienceComponent } from './professional-experience/professional-experience.component';
import { PersonalSkillComponent } from './personal-skill/personal-skill.component';
import { ProgrammingLanguageComponent } from './programming-language/programming-language.component';
import { LanguageComponent } from './language/language.component';

@NgModule({
  declarations: [
    EmployeeCreateComponent,
    TechnicalResourceCreateComponent,
    CompanyCreateComponent,
    AcademicInformationComponent,
    ProfessionalExperienceComponent,
    PersonalSkillComponent,
    ProgrammingLanguageComponent,
    LanguageComponent
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
    AcademicInformationComponent,
    ProfessionalExperienceComponent,
    PersonalSkillComponent,
    ProgrammingLanguageComponent,
    LanguageComponent
  ]
})
export class UserModule { }
