import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Interview } from './interview';
import { InterviewCreate } from './interview-create';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Guest } from './guest';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private apiUrl = environment.baseUrlInterviews;

  constructor(private htpp: HttpClient) { }

  getInterviews(): Observable<Interview[]>{
    return this.htpp.get<Interview[]>(this.apiUrl)
  }

  getInterview(id_meet:number): Observable<Interview>{
    return this.htpp.get<Interview>(`${this.apiUrl}/${id_meet}`)
  }

  addInterview(meet: InterviewCreate): Observable<Interview>{
    return this.htpp.post<Interview>(this.apiUrl, meet)
  }

  updateInterview(meet: InterviewCreate, id:number): Observable<Interview>{
    return this.htpp.put<Interview>(`${this.apiUrl}/${id}`, meet)
  }

  addGuest(id_meet:number, id_user:number):Observable<Interview>{
    return this.htpp.post<Interview>(`${this.apiUrl}/${id_meet}/usuario/${id_user}`, null)
  }

  deleteGuest(id_meet:number, id_user:number):Observable<any>{
    return this.htpp.delete<Interview>(`${this.apiUrl}/${id_meet}/usuario/${id_user}`)
  }

  confirmMeet(id_guest:number, estado:string):Observable<Guest>{
    return this.htpp.put<Guest>(`${this.apiUrl}/confirmar/${id_guest}`, {"confirmar": estado})
  }

  scoreMeet(id_guest:number, score:number):Observable<Guest>{
    return this.htpp.put<Guest>(`${this.apiUrl}/calificar/${id_guest}`, {"score": score})
  }

}
