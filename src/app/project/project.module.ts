import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { MemberComponent } from './member/member.component';
import { TagComponent } from './tag/tag.component';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    ProjectCreateComponent,
    ProjectViewComponent,
    ProjectListComponent,
    MemberComponent,
    TagComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    DataViewModule,
    ButtonModule
  ],
  exports: [
    ProjectCreateComponent,
    ProjectViewComponent,
    ProjectListComponent,
    MemberComponent,
    TagComponent
  ]
})
export class ProjectModule { }
