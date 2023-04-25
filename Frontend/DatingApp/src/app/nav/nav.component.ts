import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Login } from '../models/login.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public loginForm!: FormGroup;
  isLoggedIn: boolean = false;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    const loginData = this.loginForm.value;
    let model: Login = {
      userName: this.loginForm.value['userName'],
      password: this.loginForm.value['password'],
    };
    this.accountService.login(model).subscribe((response) => {
      this.isLoggedIn = true;
      console.log(response);
    });
  }
}
