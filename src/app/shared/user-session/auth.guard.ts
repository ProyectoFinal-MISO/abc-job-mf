import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn, CanActivateChildFn } from '@angular/router';
import { UserSessionService } from './user-session.service';

/*@Injectable({
    providedIn: 'root'
  })
  class PermissionsService {
  
    constructor(private router: Router, private userSessionService: UserSessionService) {}
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.userSessionService.getUserToken()) {
            return true;
        }
        this.userSessionService.closeSession();
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
  }
  
  export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(PermissionsService).canActivate(next, state);
  }
*/

  export const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const userSessionService = inject(UserSessionService);
    const router = inject(Router);
        if (userSessionService.getUserToken() && userSessionService.getUserToken()!=='' ) {
            return true;
        }
        userSessionService.closeSession();
        router.navigate(['/login']);
        return false;
  };
  
  export const AuthGuard: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);