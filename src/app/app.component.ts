import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserSessionService } from './shared/user-session/user-session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  login = false;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private userSessionService: UserSessionService,
    private cdRef: ChangeDetectorRef,
    private router: Router) {       
    this.subscription = this.userSessionService.getMessage().subscribe(x => {
      setTimeout(() => {
        this.login = x.status;
        this.cdRef.detectChanges();
      }, 0);
    })
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      let layout = document.getElementsByTagName("app-layout");
      if (layout.length > 0 ) {
        document.getElementsByTagName("app-layout")[0].scrollIntoView();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    //this.cdRef.detach();
  }
}