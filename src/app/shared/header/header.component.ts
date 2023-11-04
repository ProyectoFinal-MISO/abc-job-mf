import { Component, OnInit  } from '@angular/core';
import { SharedService } from '../shared.service';
import { UserSessionService } from '../user-session/user-session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userSession!:any;

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

}