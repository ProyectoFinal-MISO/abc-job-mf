import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/shared.service';
import { ProjectService } from '../project.service';
import { UserSessionService } from 'src/app/shared/user-session/user-session.service';

@Component({
  selector: 'app-project-delete',
  templateUrl: './project-delete.component.html',
  styleUrls: ['./project-delete.component.scss']
})
export class ProjectDeleteComponent {
  helper = new JwtHelperService();
  projectForm: FormGroup;
  localStageData: any;
  closeResult = '';
  url!: string;
  projectId: number;

  constructor(
    private projectService: ProjectService,
    private userSessionService: UserSessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,    
    private sharedService: SharedService
  ) { 
    this.sharedService.setSite('Close Project');
  }

  createForm() {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.projectForm = this.formBuilder.group({
      aceptTerms: ['', [Validators.required]],
      status: ['', [Validators.required]],
      id: [projectId],
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  async deleteProject() {
    let projectAux = { ...this.projectForm.value };
    this.projectService.deleteProject(projectAux.projectId).subscribe({
          next: (response: any) => {
            this.toastr.success(`delete succesful`, 'Success', {
              progressBar: true,
            });
            this.router.navigate([`/project/view/${projectAux.projectId}`]);
          },
          error: (e0: any) => {
            this.toastr.error(`delete fail`, 'Error, ' + e0, {
              progressBar: true,
            });
          },
          complete: () => {
            console.log('delete0')
          }
    });    
  }
}
