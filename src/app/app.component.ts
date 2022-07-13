import { Component, OnInit, Output } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ApnaSocial';
  firebaseAuth: FirebaseTSAuth;
  constructor(private auth: AuthService) {
    this.firebaseAuth = new FirebaseTSAuth();
    this.firebaseAuth.listenToSignInStateChanges(
      user => {
        this.firebaseAuth.checkSignInState({
          whenSignedIn: user => {

          },
          whenSignedOut: user => {

          },
          whenSignedInAndEmailNotVerified: user => {

          },
          whenSignedInAndEmailVerified: user => {

          },
          whenChanged: user => {

          }
        });
      }
    );
  }
  isLoggedIn() {
    return this.auth.isloggedIn();
  }
  navTo: string ="login";
  NavigateTo(value: any) {
    this.navTo = value;
  }
  ngOnInit(): void {
  }
}
