import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth: FirebaseTSAuth;
  constructor(private router: Router) {
    this.firebaseAuth = new FirebaseTSAuth();
  }
  logOut() {
    this.firebaseAuth.signOut();
    sessionStorage.removeItem('loginState');

    this.router.navigate(['']);
  }
  setLoginState(token: string) {
    sessionStorage.setItem('loginState', token);
  }
  getLoginState() {
    return sessionStorage.getItem("loginState");
  }
  isloggedIn() {
    return this.getLoginState() !== null;
  }
}
