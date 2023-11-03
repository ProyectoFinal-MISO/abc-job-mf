import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { TechnicalResource } from 'src/app/shared/model/technical-resource';

@Injectable({
  providedIn: 'root'
})
export class TechnicalResourceService {

  private backUrl: string = environment.baseUrl;
  private backController: string = 'users/technical_resource';

  constructor(private http: HttpClient) { }

  addUser(user: TechnicalResource): Observable<any> {
    return this.http.post<any>(`/api/users`, user);
  }

  getUser(userId:any): Observable<TechnicalResource>{
    return this.http.get<TechnicalResource>(`/api/${this.backController}/${userId}`);
  }
}
