import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser(); //sets the current logged in user. It's best to set the current logged in user from the app.component cause it nests all the others components. That being said, it affects all components
  }

  setCurrentUser(): void {
    const user: User = JSON.parse(localStorage.getItem('user') || 'null');
    this.accountService.setCurrentUser(user);
  }
}
