import { Component } from '@angular/core';
import { Project } from 'src/app/shared/model/project';
import { ProjectService } from '../project.service';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { UserSessionService } from 'src/app/shared/user-session/user-session.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  projects: Project[];
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
      this.projectService.getProject(this.usserSessionData.id).subscribe((data:any) => {        
        if (data) {
          this.projects = data;
        } else {
        }
      });
      this.primengConfig.ripple = true;
  }

  goAddProject(){
    this.router.navigate([`/project/add`]); 
  }
}
