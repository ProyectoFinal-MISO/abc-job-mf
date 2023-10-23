import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private backUrl: string = environment.baseUrl;
  private backController: string = 'users';

  constructor(private http: HttpClient) { }

}
