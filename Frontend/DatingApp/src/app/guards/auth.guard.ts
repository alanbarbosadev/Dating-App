import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}
  canActivate(): Observable<boolean> {
    //you don't need to subscribe to a Observable when your on a "Guard" type class
    //if there is a autheticated user logged in, then he can have access to the routes that uses this guard [AuthGuard]
    return this.accountService.currentUser$.pipe(
      map((user) => {
        if (user) return true;
        this.toastr.error('You shall not pass!');
        return false;
      })
    );
  }
}
