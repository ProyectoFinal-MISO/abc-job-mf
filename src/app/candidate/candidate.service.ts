import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Candidate } from '../shared/model/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private backUrl: string = environment.baseUrl;
  private backController: string = "user";

  constructor(private http: HttpClient) { }

  requestByCompany(data: any): Observable<any> {
    return this.http.post<any>(`${this.backUrl}/${this.backController}/requestByCompany`, data);
  }

  getRequestByUser(userId:any): Observable<Candidate>{
    return this.http.get<Candidate>(`${this.backUrl}/${this.backController}/getRequestByUser/${userId}`);
  }

  updateCandidateStatus(data: any): Observable<any> {
    return this.http.put<any>(`${this.backUrl}/${this.backController}/requestByCompany/${data.candidateId}`, data);
  }

}
