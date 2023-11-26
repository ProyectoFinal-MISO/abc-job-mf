import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Project } from '../shared/model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private backControllerProject: string = 'projects';
  private backControllerTeam: string = 'projects';
  private backControllerMember: string = 'projects';
  private urlProjects:string = environment.baseUrlProjects

  constructor(private http: HttpClient) { }

  addProject(project: Project): Observable<any> {
    return this.http.post<any>(`${this.urlProjects}`, project);
  }
  
  getProject(projectId:any): Observable<Project>{
    return this.http.get<Project>(`${this.urlProjects}/${this.backControllerProject}/${projectId}`);
  }

  deleteProject(projectId:any): Observable<Project>{
    return this.http.delete<Project>(`${this.urlProjects}/${this.backControllerProject}/${projectId}`);
  }

  updateProject(project: Project): Observable<any> {
    return this.http.put<any>(`${this.urlProjects}/${this.backControllerProject}/${project.id}`, project);
  }

  getTeam(projectId:any): Observable<Project>{
    return this.http.get<Project>(`${this.urlProjects}/${this.backControllerTeam}/${projectId}`);
  }

  getMembers(projectId:any): Observable<Project>{
    return this.http.get<Project>(`${this.urlProjects}/${this.backControllerMember}`);
  }

  getMember(projectId:any): Observable<Project>{
    return this.http.get<Project>(`${this.urlProjects}/${this.backControllerMember}/${projectId}`);
  }
}
