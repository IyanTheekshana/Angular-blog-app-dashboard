import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: any;

  constructor(private authservice: AuthService) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authservice.isLoggedIn();
  }

  onLogout() {
    this.authservice.logout();
  }
}
