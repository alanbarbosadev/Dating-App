import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  onRegisterMode: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  setRegisterMode(): void {
    this.onRegisterMode = !this.onRegisterMode;
  }

  cancelRegisterMode(event: boolean): void {
    this.onRegisterMode = event;
  }
}
