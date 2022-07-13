import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth'
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  firebaseAuth: FirebaseTSAuth;
  constructor() { 
    this.firebaseAuth = new FirebaseTSAuth();
  }
  resetUserEmail(resetEmail: HTMLInputElement) {
  let email = resetEmail.value;
  if (this.isNotEmpty(email)) {
  this.firebaseAuth.sendPasswordResetEmail({
  email: email,
  onComplete: (user) => {
    alert(`Password Reset Email Sent to ${email}` );
  }
});
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
