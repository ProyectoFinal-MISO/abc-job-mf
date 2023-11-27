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
    if(!this.sharedService.getMockMode()){
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
      this.project = {
        projectId:1,
        companyId: 1,
        details: "Varguard es un proyecto de intercambio de documentos entre transportadoras de mercancía",
        teamId: 1,
        teamName: "Macondo",
        startDate: new Date('2023-01-02'),
        endDate: new Date('2023-12-02'),
        id:1,
        status: true,
        personalSkills:[{id:1, name:"Responsable"}, {id:2, name:"Prompt"}, {id:3, name:"Lead"}, 
        {id:4, name:"Smart"}, {id:5, name:"Patient"}],
        projectName: "Vanguard",
        roles:[{id:1, name:"Developer"}, {id:2, name:"Tester"}, {id:3, name:"Devops"}, 
        {id:4, name:"Leader"}, {id:5, name:"Architect"}, {id:6, name:"Ui/Ux"}],        
        technicalSkills:[{id:1, name:"Python"}, {id:2, name:"SQL"}, {id:3, name:"Angular"}, 
        {id:4, name:"Docker"}, {id:5, name:"C#"}, {id:6, name:"React"}, {id:7, name:"Cypress"},
        {id:8, name:"GCP"}, {id:9, name:"Jira"}, {id:10, name:"Figma"}, {id:11, name:"Pipeline"}, 
        {id:12, name:"JMeter"}],
        members: [
          {id:1, name: "Pepito Perez",teamId: 1, userId:1, role: 1, company:"Endava", isIntern:false, 
          technicalSkills:[{id:1, name:"Python", score:5}, {id:3, name:"Angular", score:3}, {id:4, name:"Docker", score:2}],
          personalSkills:[{id:1, name:"Responsable", score:5}, {id:2, name:"Prompt", score:4}, {id:4, name:"Smart", score:5}]
          }, 
          {id:2, name: "Fulanito Sevilla",teamId: 1, userId:4, role: 2, company:"Endava", isIntern:false, 
          technicalSkills:[{id:7, name:"Cypress", score:5}, {id:12, name:"JMeter", score:3}],
          personalSkills:[{id:1, name:"Responsable", score:5}, {id:2, name:"Prompt", score:4}, {id:4, name:"Smart", score:5}]
          }, 
          {id:3, name: "Kika Dorada",teamId: 1, userId:5, role: 3, company:"Endava", isIntern:true, 
          technicalSkills:[{id:4, name:"Docker", score:4}, {id:11, name:"Pipeline", score:5}],
          personalSkills:[{id:1, name:"Responsable", score:5}, {id:2, name:"Prompt", score:4}, {id:4, name:"Smart", score:5}]
          }, 
          {id:4, name: "Sutanita Veracruz",teamId: 1, userId:6, role: 4, company:"Endava", isIntern:true, 
          technicalSkills:[{id:9, name:"Jira", score:5}],
          personalSkills:[{id:1, name:"Responsable", score:5}, {id:2, name:"Prompt", score:4}, {id:4, name:"Smart", score:5}, 
          {id:5, name:"Patient", score:3}, {id:3, name:"Lead", score:5}]
          }, 
          {id:5, name: "Ali Aranzazu",teamId: 1, userId:7, role: 5, company:"Endava", isIntern:false, 
          technicalSkills:[{id:1, name:"Python", score:4}, {id:3, name:"Angular", score:2}, {id:4, name:"Docker", score:5},{id:8, name:"GCP", score:5}],
          personalSkills:[{id:1, name:"Responsable", score:5}, {id:2, name:"Prompt", score:4}, {id:4, name:"Smart", score:5}]
          }
        ]
      }
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
    this.project.members?.push(
      myObjAux
      );
  }
  
  onUpdate(){
    this.router.navigate([`/project/update/` + this.project.id]);
  }

  onDelete(){
    this.router.navigate([`/project/delete/` + this.project.id]);
  }
}
