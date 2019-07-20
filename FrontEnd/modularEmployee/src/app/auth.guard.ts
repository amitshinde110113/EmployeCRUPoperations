import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { HttpService } from './shared/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: HttpService,
    private _router: Router) { }

  canActivate(): boolean {
    if (this._authService.loggedIn()) {
     /// console.log('true')
      return true
    } else {
     /// console.log('false')            
      this._router.navigate(['auth/login'])
      return false
    }
  }
}