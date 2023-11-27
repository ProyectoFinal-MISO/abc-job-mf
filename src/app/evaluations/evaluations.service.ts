import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Evaluation } from '../shared/model/evaluations';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private apiUrl = environment.baseUrlEvaluations;

  constructor(private htpp: HttpClient) { }

  getEvaluations(): Observable<Evaluation[]>{
    return this.htpp.get<Evaluation[]>(this.apiUrl)
  }

}
