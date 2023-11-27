import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { User } from '../shared/model/user';
import { UserSimple } from './user-simple';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private backUrlUsers: string = environment.baseUrlUsers;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User>{
    return this.http.get<User>(`${this.backUrlUsers}`);
  }

  getAllCompany(): Observable<UserSimple[]>{
    return this.http.get<UserSimple[]>(`${this.backUrlUsers}/COMPANY`)
  }

  getAllResource(): Observable<UserSimple[]>{
    return this.http.get<UserSimple[]>(`${this.backUrlUsers}/PERSON`)
  }

}
