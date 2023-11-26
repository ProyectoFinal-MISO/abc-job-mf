import { Component } from '@angular/core';
import { Project } from 'src/app/shared/model/project';
import { ProjectService } from '../project.service';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { UserSessionService } from 'src/app/shared/user-session/user-session.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { ProjectView } from 'src/app/shared/model/project-view';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  projects: ProjectView[];
  usserSessionData:any;

  constructor(private projectService: ProjectService, 
    private userSessionService: UserSessionService,
    private router: Router,
    private sharedService: SharedService,
    private primengConfig: PrimeNGConfig) {
      this.sharedService.setSite('Projects');
      this.usserSessionData =  this.userSessionService.getUserSession();
    }

  ngOnInit() {
    this.projects = [{
      projectId:1,
      companyId: 1,
      details: "loreim ipsuem",
      personalSkills:[],
      projectName: "Vanguard",
      roles:[],
      teamName: "Macondo",
      technicalSkills:[]
    },
    {
      projectId:2,
      companyId: 1,
      details: "loreim ipsuem",
      personalSkills:[],
      projectName: "Cranberry",
      roles:[],
      teamName: "DevHorses",
      technicalSkills:[]
    },{
      projectId:3,
      companyId: 1,
      details: "loreim ipsuem",
      personalSkills:[],
      projectName: "Cretta",
      roles:[],
      teamName: "Apolo",
      technicalSkills:[]
    },{
      projectId:4,
      companyId: 1,
      details: "loreim ipsuem",
      personalSkills:[],
      projectName: "Epsilon",
      roles:[],
      teamName: "Marmot",
      technicalSkills:[]
    },{
      projectId:5,
      companyId: 1,
      details: "loreim ipsuem",
      personalSkills:[],
      projectName: "Avva",
      roles:[],
      teamName: "Delta",
      technicalSkills:[]
    },{
      projectId:6,
      companyId: 1,
      details: "loreim ipsuem",
      personalSkills:[],
      projectName: "Anubis",
      roles:[],
      teamName: "Nilo",
      technicalSkills:[]
    }];
     /* this.projectService.getProject(this.usserSessionData.id).subscribe((data:any) => {        
        if (data) {
          this.projects = data;
        } else {
          
        }
      });*/
      this.primengConfig.ripple = true;
  }

  goAddProject(){
    this.router.navigate([`/project/add`]); 
  }

  goViewProject(id:any){
    this.router.navigate([`/project/view/${id}`]); 
  }
}
