import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from  'firebasets/firebasetsFireStore/firebaseTSFireStore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  selectedImagefile!: File;
  constructor(private dialog: MatDialogRef<CreatePostComponent>) { }
  firebaseAuth = new FirebaseTSAuth;
  firestore = new FirebaseTSFirestore;
  storage = new FirebaseTSStorage;
  ngOnInit(): void {
  }
  onPhotoSelected(photoSelector: HTMLInputElement) {
    this.selectedImagefile = photoSelector.files![0];
    if(!this.selectedImagefile) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImagefile);
    fileReader.addEventListener(
      "loadend",
      ev => {
        let readbleString = fileReader.result!.toString();
        let postPreviewImage = <HTMLImageElement>document.getElementById("post-preview-img");
        postPreviewImage.src = readbleString;
      }
    )
  }
  name: string ="";
  description: string ="";
  uploadImagePost(comment: string) {
    let postId = this.firestore.genDocId();
    this.storage.upload(
      {
        uploadName: "upload image Post",
        path: ["Posts", postId, "image"],
        data: {
          data: this.selectedImagefile
        },
        onComplete: (downloadUrl)=> {
          this.firestore.create(
            {
              path: ["Posts", postId],
              data: {
                comment: comment,
                creatorId: this.firebaseAuth.getAuth().currentUser!.uid,
                imageUrl: downloadUrl,
                timestamp: FirebaseTSApp.getFirestoreTimestamp(),
                name: this.name,
                desc: this.description
              },
              onComplete: (docId) => {
                this.dialog.close();
                window.location.reload();
              },
              onFail: (err) => {
                alert(err.message)
              }
            }
          )
        }
      }
    );
  }
  uploadPost(comment: string) {
    this.firestore.create(
      {
        path: ["Posts"],
        data: {
          comment: comment,
          creatorId: this.firebaseAuth.getAuth().currentUser!.uid,
          timestamp: FirebaseTSApp.getFirestoreTimestamp(),
          name: this.name,
          desc: this.description
        },
        onComplete: (docId) => {
          this.dialog.close();
          window.location.reload();
        },
        onFail: (err) => {
          alert(err.message)
        }
      }
    )
  }
  onPostClick(commentInput: HTMLTextAreaElement) {
    this.dialog.close();
      let comment = commentInput.value;
      if(this.selectedImagefile && comment.length === 0 ) {
        comment = " ";
      }
      if(comment.length <= 0) return;
      if(this.selectedImagefile) {
        this.uploadImagePost(comment);
      }else {
        this.uploadPost(comment);
      }
  }
}
