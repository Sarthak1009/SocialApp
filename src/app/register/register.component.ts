import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firebaseAuth: FirebaseTSAuth;
  constructor(private router: Router) {
    this.firebaseAuth = new FirebaseTSAuth();
  }
  registerUser(
    registerEmail: HTMLInputElement,
    registerPassword: HTMLInputElement,
    registerConfirmPassword: HTMLInputElement
  ) {
    let email = registerEmail.value;
    let password = registerPassword.value;
    let confirmPassword = registerConfirmPassword.value;
    if (
      this.isNotEmpty(email) && 
      this.isNotEmpty(password) && 
      this.isNotEmpty(confirmPassword) &&
      this.isAMatch(password, confirmPassword)
    ){
      this.firebaseAuth.createAccountWith({
        email: email,
        password: password,
        onComplete: (user) => {
          alert("Account Created Successfully");
          registerEmail.value = "";
          registerPassword.value = "";
          registerConfirmPassword.value = "";
          this.navigateToLogin("login");
        },
        onFail: (error) => {
          alert("Failed!");
        }
      });
    }
  }
  isNotEmpty( text: string ) {
    return text != null && text.length > 0;
  }
  isAMatch( text:string , compareWith: string) {
    return text == compareWith;
  }
  @Output() navigateListener = new EventEmitter<string>();
  loginVar: string = "";
  navigateToLogin(login: string) {
    this.loginVar = login;
    this.navigateListener.emit(this.loginVar)
  }
  ngOnInit(): void {
  }
}

