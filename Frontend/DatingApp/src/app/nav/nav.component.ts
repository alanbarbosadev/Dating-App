import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
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
    this.accountService.login(model).subscribe(() => {
      this.router.navigateByUrl('/members');
      this.toastr.success('Login Successful!');
    });
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    this.resetLoginData();
    this.toastr.success('Logout Successful!');
  }

  resetLoginData(): void {
    this.loginForm.setValue({
      userName: null,
      password: null,
    });
  }
}
