import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Company } from 'src/app/shared/model/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private backUrl: string = environment.baseUrl;
  private backController: string = 'users/company';

  constructor(private http: HttpClient) { }

  addUser(user: Company): Observable<any> {
    return this.http.post<any>(`/api/users`, user);
  }

  getUser(userId:any): Observable<Company>{
    return this.http.get<Company>(`/api/${this.backController}/${userId}`);
  }
}
