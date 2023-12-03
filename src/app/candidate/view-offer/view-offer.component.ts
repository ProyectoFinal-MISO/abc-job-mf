import { Component } from '@angular/core';
import { Project } from 'src/app/shared/model/project';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { UserSessionService } from 'src/app/shared/user-session/user-session.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { ProjectView } from 'src/app/shared/model/project-view';
import { ProjectService } from 'src/app/project/project.service';
import { Candidate } from 'src/app/shared/model/candidate';
import { CandidateService } from '../candidate.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-offer',
  templateUrl: './view-offer.component.html',
  styleUrls: ['./view-offer.component.scss']
})
export class ViewOfferComponent {
  projects: ProjectView[]=[];
  projectsCandidate: ProjectView[] =[];
  usserSessionData:any;
  candidates: Candidate[];

  constructor(private projectService: ProjectService, 
    private userSessionService: UserSessionService,
    private router: Router,
    private sharedService: SharedService,
    private primengConfig: PrimeNGConfig, 
    private candidateService: CandidateService,    
    private toastr: ToastrService) {
      this.usserSessionData =  this.userSessionService.getUserSession();
    }

  ngOnInit() {
    if(!this.sharedService.getMockMode()){
      this.projectService.getProjectByCompany(this.usserSessionData.id).subscribe((data:any) => {        
        if (data) {
          this.projectsCandidate = data;
        } else {
          
        }
      });

      this.candidateService.getRequestByUser(this.usserSessionData.id).subscribe((data:any) => {        
        if (data) {
          this.candidates = data;
        } else {
          
        }
      });
    } else {
      this.projectsCandidate = [{
        projectId:1,
        companyId: 1,
        details: "loreim ipsuem",
        personalSkills:[],
        projectName: "Vanguard",
        roles:[],
        teamName: "Macondo",
        technicalSkills:[],
        startDate: new Date('2024-01-01')
      },
      {
        projectId:2,
        companyId: 1,
        details: "loreim ipsuem",
        personalSkills:[],
        projectName: "Cranberry",
        roles:[],
        teamName: "DevHorses",
        technicalSkills:[],
        startDate: new Date('2024-01-01')
      },{
        projectId:3,
        companyId: 1,
        details: "loreim ipsuem",
        personalSkills:[],
        projectName: "Cretta",
        roles:[],
        teamName: "Apolo",
        technicalSkills:[],
        startDate: new Date('2024-01-01')
      },{
        projectId:4,
        companyId: 1,
        details: "loreim ipsuem",
        personalSkills:[],
        projectName: "Epsilon",
        roles:[],
        teamName: "Marmot",
        technicalSkills:[],
        startDate: new Date('2024-01-01')
      },{
        projectId:5,
        companyId: 1,
        details: "loreim ipsuem",
        personalSkills:[],
        projectName: "Avva",
        roles:[],
        teamName: "Delta",
        technicalSkills:[],
        startDate: new Date('2024-01-01')
      },{
        projectId:6,
        companyId: 1,
        details: "loreim ipsuem",
        personalSkills:[],
        projectName: "Anubis",
        roles:[],
        teamName: "Nilo",
        technicalSkills:[],
        startDate: new Date('2024-01-01')
      }];

      this.candidates = [{
        projectId: 1,
        userId: this.usserSessionData.id,
        status: 'OFFERS',
        id:1
      },{
        projectId: 2,
        userId: this.usserSessionData.id,
        status: 'CONTRACTED',
        id:2
      },{
        projectId: 3,
        userId: this.usserSessionData.id,
        status: 'CONTRACTED',
        id:3
      }
    ];
    }
    this.FilterProjects();
    this.primengConfig.ripple = true;
  }

  ConfirmRequest(id:any){
   let candidateAux = this.candidates.find(x => x.projectId === id);
   if(candidateAux){
    candidateAux.status = 'CANDIDATE';
    this.toastr.success(`Request was accepted`, 'Success', {
      progressBar: true,
    });
    this.FilterProjects();
   }   
  }

 FilterProjects(){  
  this.projects = [];
  this.projectsCandidate.forEach(x=> this.candidates.forEach(y => {
    if(y.projectId === x.projectId && y.status==='OFFERS'){
      this.projects.push(x);      
    }
  } ));
 }

}
