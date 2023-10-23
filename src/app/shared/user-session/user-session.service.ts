import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserSessionDto } from '../model/user-session';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  private backUrl: string = environment.baseUrl;
  private storage = window.localStorage;

  private myUserChangeSubject = new Subject<void>();
  public myUserChangeObservable = this.myUserChangeSubject.asObservable();
  private subjectStatus = new Subject<any>();

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
      this.storage.clear();
      this.sendMessage(false);
  }

    userLogIn(myUser: UserSessionDto ): Observable<any> {
        return this.http.post<any>(`${this.backUrl}/login`, myUser);
    }

    userSignUp(myUser: UserSessionDto): Observable<any> {
        return this.http.post<any>(`${this.backUrl}/signin`, myUser);
    }

   /* getUsers(): Observable<Usuario>{
      return this.http.get<Usuario>(`${this.backUrl}/usuario`);
    }
*/
    getUser(userId:number): Observable<UserSessionDto>{
      return this.http.get<UserSessionDto>(`${this.backUrl}/user/${userId}`);
    }

    getUserToken(): string {
      const userModel = <UserSessionDto>JSON.parse(this.getItem(environment.sur)!);
      if (userModel !== null) {
          return userModel.token;
      }
      return '';
  }
  sendMessage(status: Boolean) {
    this.subjectStatus.next({ status: status })
  }

  getMessage(): Observable<any> {
    return this.subjectStatus.asObservable();
  }
}
