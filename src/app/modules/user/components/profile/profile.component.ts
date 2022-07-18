import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFireStore/firebaseTSFireStore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  firestore: FirebaseTSFirestore;
  firebaseAuth: FirebaseTSAuth;
  constructor(private router: Router, private dialog: MatDialogRef<ProfileComponent>) {
    this.firestore = new FirebaseTSFirestore();
    this.firebaseAuth = new FirebaseTSAuth();
  }
  @Output() profileClose = new EventEmitter<boolean>();

  onContinueClick(Username: HTMLInputElement, Userdesc: HTMLTextAreaElement) {
    this.dialog.close();
    let name = Username.value;
    let desc = Userdesc.value;
    this.firestore.create(
      {
        path: ["Users", this.firebaseAuth.getAuth()!.currentUser!.uid],
        data: {
          publicName: name,
          description: desc,
        },
        onComplete: (docId) => {
          Username.value = "";
          Userdesc.value = "";
          this.router.navigate(['/user/home']);
          this.profileClose.emit(false);
          window.location.reload();
        },
        onFail: (error) => {
          alert(error.message);
        }
      }
    );
  }
  ngOnInit(): void {
  }

}
