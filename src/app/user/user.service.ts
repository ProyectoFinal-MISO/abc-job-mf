import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { User } from '../shared/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlUsers:string = environment.baseUrlUsers
  private backController: string = 'users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User>{
    return this.http.get<User>(`${this.urlUsers}/${this.backController}`);
  }

}
