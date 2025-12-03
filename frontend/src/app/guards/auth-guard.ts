import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from '../services/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: Auth, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> {

    if (!this.authService.isAuthenticated()) {
      return this.router.parseUrl('/login');
    }

    const allowedRoles = route.data['roles'] as Array<string>;

    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }

    const userRole = this.authService.getCurrentUserRole();

    if (!allowedRoles.includes(userRole!)) {
      return this.router.parseUrl('/home');
    }

    return true;
  }
}
