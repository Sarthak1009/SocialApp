import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth'
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  firebaseAuth: FirebaseTSAuth;
  constructor(private router: Router, private auth: AuthService) {
    this.firebaseAuth = new FirebaseTSAuth();
  }
  loginUser(
    loginEmail: HTMLInputElement,
    loginPassword: HTMLInputElement
  ) {
    let email = loginEmail.value;
    let password = loginPassword.value;
    if (this.isNotEmpty(email) && this.isNotEmpty(password)) {
      this.firebaseAuth.signInWith({
        email: email,
        password: password,
        onComplete: (user) => {
          loginEmail.value = "";
          loginPassword.value = "";
          this.auth.setLoginState('LSTrue');
          this.router.navigate(['user']);
        },
        onFail: (error) => {
          alert("Failed!");
        }
      })
    }
    else {
      alert("Please fill in all fields");
    }
  }
  isNotEmpty(text: string) {
        return text != null && text.length > 0;
      }
      @Output() navigateListener = new EventEmitter<string>();
      navVar: string = "";
      navigateTo(nav: string) {
        this.navVar = nav;
        this.navigateListener.emit(this.navVar)
      }
  ngOnInit(): void {
      }

}
