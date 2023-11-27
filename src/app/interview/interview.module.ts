import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { InterviewCreateComponent } from './interview-create/interview-create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  exports: [InterviewListComponent],
  declarations: [InterviewListComponent, InterviewCreateComponent]
})
export class InterviewModule { }
