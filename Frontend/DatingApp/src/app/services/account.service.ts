import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl: string = 'https://localhost:7185/api/';

  constructor(private http: HttpClient) {}

  login(model: Login): Observable<Login> {
    return this.http.post<Login>(this.baseUrl + 'Account/login', model);
  }
}
