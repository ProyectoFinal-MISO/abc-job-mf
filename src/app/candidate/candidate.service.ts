import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

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

}
