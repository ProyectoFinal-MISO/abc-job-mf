import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Employee } from 'src/app/shared/model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private backController: string = 'employee';
  private urlUsers:string = environment.baseUrlUsers

  constructor(private http: HttpClient) { }

  addUser(user: Employee): Observable<any> {
    return this.http.post<any>(`${this.urlUsers}`, user);
  }

  getUser(userId:any): Observable<Employee>{
    return this.http.get<Employee>(`${this.urlUsers}${this.backController}/${userId}`);
  }

  deleteUser(userId:any): Observable<Employee>{
    return this.http.delete<Employee>(`${this.urlUsers}${this.backController}/${userId}`);
  }
}
