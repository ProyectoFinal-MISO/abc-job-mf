import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, UntypedFormArray} from '@angular/forms';
import { ActivatedRoute, NavigationStart, NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { UserSessionDto } from 'src/app/shared/model/user-session';
import { Project } from 'src/app/shared/model/project';
import { SharedService } from 'src/app/shared/shared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserSessionService } from 'src/app/shared/user-session/user-session.service';
import { ProjectService } from '../project.service';


@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent {

  helper = new JwtHelperService();
  projectForm: FormGroup;
  project: Project;
  closeResult = '';
  url!: string;
  usserSessionData:any;
  transferAvailabilities: any = [];

  constructor(
    private projectService: ProjectService,
    private userSessionService: UserSessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private sharedService: SharedService
  ) {
    this.sharedService.setSite('Edit Project');
    this.usserSessionData =  this.userSessionService.getUserSession();
  }
  
  createForm(){
    this.projectForm = this.formBuilder.group({
      projectName: ['', [Validators.required]],
      details: ['', [Validators.required]],
      companyId: [''],
      team: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    });
    this.getProject();
  }

  ngOnInit() {
    this.createForm();
  }

  showError(error: string) {
    this.toastr.error(error, 'Error');
  }

  showSuccess() {
    this.toastr.success(`Se ha registrado exitosamente`, 'Registro exitoso');
  }

  async updateProject() {
    this.projectService.addProject(this.projectForm.value).subscribe({
      next: (result:any) => {
        if(result){
          this.projectForm.reset();
          this.toastr.success(`Add project succesful`, 'Success', {
            progressBar: true,
          });
          this.router.navigate([`/project/list`]); 
        }
      },
      error: (e0:any) => {
        this.toastr.error(`Error`, e0, {
          progressBar: true,
        });
      },
      complete: () => console.log('complete0'),
    });
  }

  getProject(){
    debugger
    const projectId = this.route.snapshot.paramMap.get('id');
    if(!this.sharedService.getMockMode()){
      this.projectService.getProject(projectId).subscribe(data => {      
        if (data) {
          this.project = data;
        } else {
        }
      });
    }else{
      this.project = {
        id:1,
        companyId: 1,
        projectName: "Varguard",
        details: "Varguard es un proyecto de intercambio de documentos entre transportadoras de mercancía",
        teamNa: "Macondo",
        startDate: new Date('2023-01-02'),
        endDate: new Date('2023-12-02'),
        status: true
      }
    }
    
    this.projectForm.get('projectName')?.setValue(this.project.projectName);
    this.projectForm.get('projectName')?.updateValueAndValidity();

    this.projectForm.get('details')?.setValue(this.project.details);
    this.projectForm.get('details')?.updateValueAndValidity();

    this.projectForm.get('companyId')?.setValue(this.project.companyId);
    this.projectForm.get('companyId')?.updateValueAndValidity();

    this.projectForm.get('team')?.setValue(this.project.teamNa);
    this.projectForm.get('team')?.updateValueAndValidity();

    this.projectForm.get('startDate')?.setValue(this.project.startDate);
    this.projectForm.get('startDate')?.updateValueAndValidity();

    this.projectForm.get('endDate')?.setValue(this.project.endDate);
    this.projectForm.get('endDate')?.updateValueAndValidity();
  }
}
