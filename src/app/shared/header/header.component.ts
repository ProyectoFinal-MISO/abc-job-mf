import { Component, OnInit  } from '@angular/core';
import { SharedService } from '../shared.service';
import { UserSessionService } from '../user-session/user-session.service';
import { Router } from '@angular/router';
import { UserType } from '../model/user-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userSession!:any;
  userType=UserType;

  constructor(public sharedService: SharedService,
    private userSessionService: UserSessionService,    
    private router: Router
    ) {
   }

  ngOnInit(): void {
   this.userSession = this.userSessionService.getUserSession();
  }

  closeSession():void{
    this.userSessionService.closeSession();
    this.router.navigate([`/login`]);
  }

  goToUser(){
    if(this.userSession.userType === UserType.Employee){      
      this.router.navigate([`/employee/view/${this.userSession.id}`]);
    }
    else if (this.userSession.userType  === UserType.Company){
      this.router.navigate([`/company/view/${this.userSession.id}`]);
    }
    else{      
      this.router.navigate([`/technical-resource/view/${this.userSession.id}`]);
    }
  }

  goToProject(){
   this.router.navigate([`/project/list`]);    
  }
}