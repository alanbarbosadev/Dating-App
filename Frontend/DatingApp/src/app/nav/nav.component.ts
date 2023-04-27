import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public loginForm!: FormGroup;
  currentUser$!: Observable<User | null>;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    this.currentUser$ = this.accountService.currentUser$;
  }

  login(): void {
    const model: User = {
      userName: this.loginForm.value['userName'],
      password: this.loginForm.value['password'],
    };
    this.accountService.login(model).subscribe((response) => {
      console.log(response);
    });
  }

  logout(): void {
    this.accountService.logout();
  }
}
