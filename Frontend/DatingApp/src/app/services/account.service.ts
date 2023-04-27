import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, ReplaySubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl: string = 'https://localhost:7185/api/';
  private currentUserData = new ReplaySubject<User | null>(1);
  //It's a good practice to use $ in the end of an Observable variable name
  currentUser$ = this.currentUserData.asObservable();

  constructor(private http: HttpClient) {}

  login(model: User): Observable<User | void> {
    return this.http.post<User>(this.baseUrl + 'Account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserData.next(user);
        }
      })
    );
  }

  register(model: User): Observable<User | void> {
    return this.http.post<User>(this.baseUrl + 'Account/register', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserData.next(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserData.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserData.next(null);
  }
}
