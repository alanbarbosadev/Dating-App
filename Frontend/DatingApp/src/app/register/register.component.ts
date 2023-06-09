import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm!: FormGroup;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  register(): void {
    const model: User = {
      userName: this.registerForm.value['username'],
      password: this.registerForm.value['password'],
    };
    this.accountService.register(model).subscribe(
      () => {
        this.cancel();
      },
      (error) => {
        this.toastr.error(error.error);
      }
    );
  }

  cancel(): void {
    this.cancelRegister.emit(false);
  }
}
