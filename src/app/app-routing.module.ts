import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { UserSessionComponent } from './shared/user-session/user-session.component';
import { AuthGuard } from './shared/user-session/auth.guard';
import { HomeComponent } from './home/home.component';

import { CompanyCreateComponent } from './user/company/company-create/company-create.component';
import { CompanyViewComponent } from './user/company/company-view/company-view.component';
import { CompanyDeleteComponent } from './user/company/company-delete/company-delete.component';

import { TechnicalResourceCreateComponent } from './user/technical-resource/technical-resource-create/technical-resource-create.component';
import { TechnicalResourceViewComponent } from './user/technical-resource/technical-resource-view/technical-resource-view.component';
import { TechnicalResourceDeleteComponent } from './user/technical-resource/technical-resource-delete/technical-resource-delete.component';

import { EmployeeCreateComponent } from './user/employee/employee-create/employee-create.component';
import { EmployeeViewComponent } from './user/employee/employee-view/employee-view.component';
import { EmployeeDeleteComponent } from './user/employee/employee-delete/employee-delete.component';
import { TechnicalResourceEditComponent } from './user/technical-resource/technical-resource-edit/technical-resource-edit.component';
import { ProjectCreateComponent } from './project/project-create/project-create.component';
import { ProjectViewComponent } from './project/project-view/project-view.component';
import { ProjectListComponent } from './project/project-list/project-list.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], component: LayoutComponent, children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'company',
              children: [
              {
                path: 'add',
                component: CompanyCreateComponent,
                data: {}
              },
              {
                path: 'view/:id',
                component: CompanyViewComponent,
                data: {}
              },
              {
                path: 'delete/:id',
                component: CompanyDeleteComponent,
                data: {}
              }
            ]
      },
      { path: 'technical-resource',
              children: [
              {
                path: 'add',
                component: TechnicalResourceCreateComponent,
                data: {}
              },
              {
                path: 'view/:id',
                component: TechnicalResourceViewComponent,
                data: {}
              },
              {
                path: 'delete/:id',
                component: TechnicalResourceDeleteComponent,
                data: {}
              },
              {
                path: 'update/:id',
                component: TechnicalResourceEditComponent,
                data: {}
              }
            ]
      },
      { path: 'employee',
              children: [
              {
                path: 'add',
                component: EmployeeCreateComponent,
                data: {}
              },
              {
                path: 'view/:id',
                component: EmployeeViewComponent,
                data: {}
              },
              {
                path: 'delete/:id',
                component: EmployeeDeleteComponent,
                data: {}
              }
            ]
      },
      { path: 'project',
              children: [
              {
                path: 'add',
                component: ProjectCreateComponent,
                data: {}
              },
              {
                path: 'view/:id',
                component: ProjectViewComponent,
                data: {}
              },
              {
                path: 'delete/:id',
                component: ProjectListComponent,
                data: {}
              },
              {
                path: 'list',
                component: ProjectListComponent,
                data: {}
              }
            ]
      },
      { path: 'home', component: HomeComponent },
    ]
  },
  { path: 'signin', children: [
    { path: 'company', component: CompanyCreateComponent },
    { path: 'technicalresource', component: TechnicalResourceCreateComponent },
    { path: 'employee', component: EmployeeCreateComponent }
  ] },
  { path: 'logout', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: UserSessionComponent},
  { path: '**', redirectTo: 'login', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
