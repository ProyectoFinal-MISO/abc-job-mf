import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, UntypedFormArray} from '@angular/forms';
import { ActivatedRoute, NavigationStart, NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { UserSessionDto } from 'src/app/shared/model/user-session';
import { UserSessionService } from 'src/app/shared/user-session/user-session.service';

import { Project } from 'src/app/shared/model/project';
import { ProjectService } from '../project.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ProjectView } from 'src/app/shared/model/project-view';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TagComponent } from '../tag/tag.component';
import { Tag } from 'src/app/shared/model/tag';
import { MemberComponent } from '../member/member.component';
import { Member } from 'src/app/shared/model/member';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent {
  helper = new JwtHelperService();
  projectData: FormGroup;
  token: string | null;
  carga: boolean = false;
  project!: ProjectView;
  localStageData: any;
  closeResult = '';
  data: any;

  constructor(
    private projectService: ProjectService,
    private userSessionService: UserSessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.sharedService.setSite('View Project');
   }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.projectService.getProject(projectId).subscribe((data:any) => {        
        if (data) {
          this.project = data;
        // this.cleanData();
        } else {
        }
      });
      this.projectService.getTeam(projectId).subscribe((data1:any) => {        
        if (data1) {
          this.project.teamId = data1.id;
          this.project.teamName = data1.name;
          this.projectService.getMembers(this.project.teamId).subscribe((data2:any) => {        
            if (data2) {
              this.project.members = data2;            
            } else {
            }
          });  
        } else {
        }
      });   
    }else{

    }
  }

  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  showError(error: string) {
    this.toastr.error(error, 'Error');
  }

  showSuccess() {
    this.toastr.success(`Se ha registrado exitosamente`, 'Registro exitoso');
  }

  goAddPersonalSkills() {
    this.modalService.open(TagComponent, {ariaLabelledBy: 'myModalLabel',  backdrop: 'static' }).result.then((result) => {
      if(result){
        this.addPersonalSkill(result);
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  goAddTechnicalSkills() {
    this.modalService.open(TagComponent, {ariaLabelledBy: 'myModalLabel',  backdrop: 'static' }).result.then((result) => {
      if(result){
        this.addTechnicalSkill(result);
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  goAddRoles() {
    this.modalService.open(TagComponent, {ariaLabelledBy: 'myModalLabel',  backdrop: 'static' }).result.then((result) => {
      if(result){
        this.addRol(result);
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  goAddMembers() {
    this.modalService.open(MemberComponent, {ariaLabelledBy: 'myModalLabel',  backdrop: 'static' }).result.then((result) => {
      if(result){
        this.addMember(result);
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  addPersonalSkill(data:any) {
    const myObjAux = data as Tag;
    this.project.personalSkills.push(myObjAux);
  }

  addTechnicalSkill(data:any) {
    const myObjAux = data as Tag;
    this.project.technicalSkills.push(myObjAux);
  }

  addRol(data:any) {
    const myObjAux = data as Tag;
    this.project.roles.push(myObjAux);
  }

  addMember(data:any) {
    const myObjAux = data as Member;
    this.project.members?.push(myObjAux);
  }
  
  onUpdate(){
    this.router.navigate([`/project/update/` + this.project.id]);
  }

  onDelete(){
    this.router.navigate([`/project/delete/` + this.project.id]);
  }
}
