import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TechnicalTest } from '../shared/model/technical-test';

@Injectable({
  providedIn: 'root'
})
export class TechnicalTestService {

  private apiUrl = environment.baseUrlTechnicalTests;

  constructor(private htpp: HttpClient) { }

  getTechnicalTests(): Observable<TechnicalTest[]>{
    return this.htpp.get<TechnicalTest[]>(this.apiUrl)
  }

}
