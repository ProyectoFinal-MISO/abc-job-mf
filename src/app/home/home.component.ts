import { Component } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { UserSessionService } from '../shared/user-session/user-session.service';
import { UserType } from '../shared/model/user-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showCandidates:boolean =false;
  usserSessionData:any;

  constructor(public sharedService: SharedService,
    private userSessionService: UserSessionService) {
    this.sharedService.setSite('Home');
    this.usserSessionData =  this.userSessionService.getUserSession();
    this.showCandidates = this.usserSessionData.userType  === UserType.TechnicalResource? true:false;
  }

}
