import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Employee } from 'src/app/shared/model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private backUrl: string = environment.baseUrl;
  private backController: string = 'users';

  constructor(private http: HttpClient) { }

  addUser(user: Employee): Observable<any> {
    return this.http.post<any>(`/api/users`, user);
  }

  getUser(userId:number): Observable<Employee>{
    return this.http.get<Employee>(`/api/${this.backController}/${userId}`);
  }
}
