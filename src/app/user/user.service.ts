import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { UserSimple } from './user-simple';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private backUrlUsers: string = environment.baseUrlUsers;

  constructor(private http: HttpClient) { }

  getAllEmployee(): Observable<UserSimple[]>{
    return this.http.get<UserSimple[]>(`${this.backUrlUsers}/EMPLOYEE`)
  }

  getAllCompany(): Observable<UserSimple[]>{
    return this.http.get<UserSimple[]>(`${this.backUrlUsers}/COMPANY`)
  }

  getAllResource(): Observable<UserSimple[]>{
    return this.http.get<UserSimple[]>(`${this.backUrlUsers}/PERSON`)
  }

}
