import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  firebaseAuth: FirebaseTSAuth;
  constructor(private router: Router, private auth: AuthService, private dialog: MatDialog)  { 
    this.firebaseAuth = new FirebaseTSAuth();
  }
  LogOut() {
    this.auth.logOut();
  }
  @Output() profilleClickListner = new EventEmitter<boolean>();
  profileValue: boolean = false;
  onProfileClick(profile: boolean) {
    this.profileValue = !this.profileValue;
    // this.profilleClickListner.emit(this.profileValue);
    this.dialog.open(ProfileComponent)
  }
  ngOnInit(): void {
  }
  
}
