import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, ReplaySubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  //the ReplaySubject is a buffer to hold values
  private currentUserData = new ReplaySubject<User | null>(1); //the (1) says that this ReplaySubject only storages 1 value being of the type User or null
  //It's a good practice to use $ in the end of an Observable variable name
  currentUser$ = this.currentUserData.asObservable(); //It's best to have the current logged in user as an Observable, cause once you change it's value, every component that subscribed to it you recive it's new value

  constructor(private http: HttpClient) {}
  //Observables work with laze loading. They don't do anything unless you subscribe to them
  //the pipe() function applies methods in a Observable when they are subscribed

  login(model: User): Observable<User | void> {
    return this.http
      .post<User>(environment.baseUrl + 'Account/login', model)
      .pipe(
        map((response: User) => {
          const user = response;
          if (user) {
            localStorage.setItem('user', JSON.stringify(user)); //saves the logged in user in the local storage with the key 'user'
            this.currentUserData.next(user); //the next(user) function will push the user to the replaySubject, thus changing the currentUser$ Observable
          }
        })
      );
  }

  register(model: User): Observable<User | void> {
    return this.http
      .post<User>(environment.baseUrl + 'Account/register', model)
      .pipe(
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
    this.currentUserData.next(user); //recives a user and set it as the current logged in user
  }

  logout() {
    localStorage.removeItem('user'); //removes the current logged in user data from the local storage
    this.currentUserData.next(null); //clears the current logged in data
  }
}
