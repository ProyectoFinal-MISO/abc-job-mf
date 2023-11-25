import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Interview } from './interview';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private apiUrl = environment.baseUrlInterviews;

  constructor(private htpp: HttpClient) { }

  getInterviews(): Observable<Interview[]>{
    return this.htpp.get<Interview[]>(this.apiUrl)
  }

}
