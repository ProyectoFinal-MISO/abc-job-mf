import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { UserSessionDto } from '../model/user-session';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  private backUrl: string = environment.baseUrl;
  private storage = window.localStorage;

  private myUserChangeSubject = new Subject<void>();
  public myUserChangeObservable = this.myUserChangeSubject.asObservable();
  private subjectStatus = new Subject<any>();
  private urlUsers:string = environment.baseUrlUsers

  constructor(private http: HttpClient) { }

  private getItem(key: string){
    return this.storage.getItem(key);
  }

  private setItem(key: string, data:any){
    return this.storage.setItem(key, JSON.stringify(data));
  }

  private removeItem(key: string){
    return this.storage.removeItem(key);
  }

  userChange(){
    this.myUserChangeSubject.next();
  }

  saveUserLocal(user:any){
    this.removeItem(environment.sur);
    this.setItem(environment.sur,user);
  }

  closeSession() {
    this.removeItem(environment.sur);
    this.removeItem(environment.token);
    this.storage.clear();
    this.sendMessage(false);
  }

  userLogIn(myUser: UserSessionDto ): Observable<any> {
      return this.http.post<any>(`${this.urlUsers}/auth`, myUser);
  }

   /* getUsers(): Observable<Usuario>{
      return this.http.get<Usuario>(`${this.backUrl}/usuario`);
    }
*/
  getUser(userId:number, userType:string): Observable<User>{
      return this.http.get<User>(`${this.urlUsers}/${userType}/${userId}`);
  }

  getMyUserSession(): Observable<User>{
    return this.http.get<User>(`${this.urlUsers}/user_session`);
  }

  getUserMe(): Observable<User>{
    return this.http.get<User>(`${this.urlUsers}/me`);
  }

  /*getUserToken(): string|undefined {
      const userModel = <UserSessionDto>JSON.parse(this.getItem(environment.sur)!);
      if (userModel !== null) {
          return userModel.token;
      }
      return '';
  }**/

  getUserToken(): string|undefined {
    const token = this.getItem(environment.token)!;
    return token?token:'';
  }

  sendMessage(status: Boolean) {
    this.subjectStatus.next({ status: status })
  }

  getMessage(): Observable<any> {
    return this.subjectStatus.asObservable();
  }

  getUserSession(): any|undefined {
    const obj = this.getItem(environment.sur)!;
    return obj?JSON.parse(obj):null;
  }
}
