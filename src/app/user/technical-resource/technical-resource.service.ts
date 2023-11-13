import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { TechnicalResource } from 'src/app/shared/model/technical-resource';

@Injectable({
  providedIn: 'root'
})
export class TechnicalResourceService {

  private backController: string = 'technical_resource';
  private urlUsers:string = environment.baseUrlUsers

  constructor(private http: HttpClient) { }

  addUser(user: TechnicalResource): Observable<any> {
    return this.http.post<any>(`${this.urlUsers}`, user);
  }

  getUser(userId:any): Observable<TechnicalResource>{
    return this.http.get<TechnicalResource>(`${this.urlUsers}/${this.backController}/${userId}`);
  }

  deleteUser(userId:any): Observable<TechnicalResource>{
    return this.http.delete<TechnicalResource>(`${this.urlUsers}/${this.backController}/${userId}`);
  }
}
