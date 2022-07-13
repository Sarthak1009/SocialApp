import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from  'firebasets/firebasetsFireStore/firebaseTSFireStore';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileComponent } from '../profile/profile.component';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit, OnChanges {
  fs= new FirebaseTSFirestore();
  firebaseAuth = new FirebaseTSAuth();
  constructor(private auth: AuthService) {
  }
  userdocument: userDocument = {
    publicName: "",
    description: ""
  };
  ngOnInit(): void {
    this.getProfile();
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.getProfile();
  }
  profileShow: boolean = false;
  onProfile(value: boolean){
    this.profileShow = value
  }
  onUpdateProfile(value: boolean) {
    this.profileShow = value;
  }
  userhasProfile: boolean = false;
  getProfile() {
    const unsub = this.firebaseAuth.listenToSignInStateChanges((authobj) => {
      this.fs.listenToDocument(
        {
          name: "Getting Documnet",
          path: ["Users", this.firebaseAuth.getAuth().currentUser!.uid],
          onUpdate: (result) => {
            this.userhasProfile = result.exists;
            if (result.exists) {
            this.userdocument = <userDocument>result.data();
            };
          }
        }
      );
    })
  }
}
export interface userDocument {
  publicName: string;
  description: string
}
