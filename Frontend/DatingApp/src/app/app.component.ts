import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'DatingApp';
  users: any;
  url: string = 'https://localhost:7185/api/Users';
  appear: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.get();
  }

  get(): any {
    this.http.get(this.url).subscribe((response) => {
      this.users = response;
    });
    console.log(this.users);
  }

  toggle(): void {
    this.appear = !this.appear;
  }
}
