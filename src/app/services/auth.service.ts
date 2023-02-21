import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;
  constructor(
    private auth: Auth,
    private route: Router,
    private toastr: ToastrService
  ) {}

  login(email: string, password: string) {
    return from(
      signInWithEmailAndPassword(this.auth, email, password)
        .then(() => {
          this.toastr.success('Added Successfully', '', {
            timeOut: 3000,
          });
          this.loadUser(this.auth, true);
          this.loggedIn.next(true);
          this.isLoggedInGuard = true;
          this.route.navigate(['/dashboard']);
        })
        .catch((err) => {
          this.toastr.error('User credentials invalid', '', {
            timeOut: 3000,
          });
        })
    );
  }

  logout() {
    return from(
      this.auth
        .signOut()
        .then(() => {
          this.toastr.success('Logout', '', {
            timeOut: 3000,
          });
          this.loadUser(this.auth, false);
          this.loggedIn.next(false);
          this.isLoggedInGuard = false;
          this.route.navigate(['/login']);
        })
        .catch((err) => {
          this.toastr.error('User credentials invalid', '', {
            timeOut: 3000,
          });
        })
    );
  }

  loadUser(user: any, isTrue: boolean) {
    if (isTrue) {
      localStorage.setItem('user', JSON.stringify(user.currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
