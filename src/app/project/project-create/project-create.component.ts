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
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent {

  helper = new JwtHelperService();
  projectForm: FormGroup;
  token: string | null;
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
    this.sharedService.setSite('Create Project');
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
  }

  ngOnInit() {
    this.createForm();
    this.token = localStorage.getItem('token');
  }

  showError(error: string) {
    this.toastr.error(error, 'Error');
  }

  showSuccess() {
    this.toastr.success(`Se ha registrado exitosamente`, 'Registro exitoso');
  }

  async addProject() {
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
}
