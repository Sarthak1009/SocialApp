import { Component, Inject, Input, OnInit } from '@angular/core';
import { FirebaseTSFirestore, OrderBy } from  'firebasets/firebasetsFireStore/firebaseTSFireStore';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';
import { PostData } from '../post/post.component';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  firestore = new FirebaseTSFirestore();
  comments: comment[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) private posts: string) { }
  // @Input() postData!: PostData;
  ngOnInit(): void {
    this.getComments();
  }
  isCommentCreator(comment: comment) {
        return comment.creatorId === UserDashboardComponent.getUserDocument().userId;
  }
  getComments() {
    this.firestore.listenToCollection({
      name: "Post Comments",
      path: ["Posts", this.posts, "PostComments"],
      where: [new OrderBy("timestamp", "asc")],
      onUpdate: (result) => {
        result.docChanges().forEach(postCommentDoc => {
          if(postCommentDoc.type === "added") {
            this.comments.unshift(<comment>postCommentDoc.doc.data())
          }
        })
      }
    })
  }
  onSendClick(comment: HTMLInputElement) {
    if(comment.value.length <= 0) return;
          this.firestore.create({
            path: ["Posts", this.posts, "PostComments"],
            data: {
              comment: comment.value,
              creatorId: UserDashboardComponent.getUserDocument().userId,
              creatorName: UserDashboardComponent.getUserDocument().publicName,
              timestamp: FirebaseTSApp.getFirestoreTimestamp()
            },
            onComplete: (docId) => {
              comment.value= "";
            }
          })

        }
    
  }
export interface comment {
  creatorId: string;
  creatorName: string;
  comment: string;
  timestamp: firebase.default.firestore.Timestamp
}
