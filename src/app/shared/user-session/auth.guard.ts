import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserSessionService } from './user-session.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private userSessionService: UserSessionService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.userSessionService.getUserToken()) {
            return true;
        }
        this.userSessionService.closeSession();
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}