import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Company } from 'src/app/shared/model/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private backController: string = 'company';
  private urlUsers:string = environment.baseUrlUsers

  constructor(private http: HttpClient) { }

  addUser(user: Company): Observable<any> {
    return this.http.post<any>(`${this.urlUsers}`, user);
  }

  getUser(userId:any): Observable<Company>{
    return this.http.get<Company>(`${this.urlUsers}${this.backController}/${userId}`);
  }

  deleteUser(userId:any): Observable<Company>{
    return this.http.delete<Company>(`${this.urlUsers}${this.backController}/${userId}`);
  }
}
