import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) {}
  ngOnInit(): void {}

  onSubmit(loginValue: any) {
    this.authService.login(loginValue.email, loginValue.password);
  }
}
