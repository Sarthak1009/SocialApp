import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';
import { FirebaseTSFirestore, Limit, OrderBy } from  'firebasets/firebasetsFireStore/firebaseTSFireStore';
import { CommentComponent } from '../comment/comment.component';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnChanges {
  firestore =new FirebaseTSFirestore();
  constructor(private dialog: MatDialog) { }
  posts: PostData[] = [];
  PostData: string[] =[]
  postCId?: string;
  postCreatorArray() { 
    this.posts.forEach(post => {
    this.PostData.push(post.creatorId);
  })
}
onCommentClick(i: number) {
  console.log(this.posts[i].postId)
  this.dialog.open(CommentComponent, {data: this.posts[i].postId})
}
  creatorName:  any[] = [];
  creatorDesc:  any[] = [];
  ngOnInit(): void {
    this.getPosts();
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.getPosts();
    // this.getCreatorInfo();
  }
onCreatePostClick() {
  this.dialog.open(CreatePostComponent);
}
getCreatorInfo() {
  this.postCreatorArray();
  for(let i = 0; i < this.PostData.length; i++) {
    this.firestore.getDocument(
      {
        path: ["Users", this.PostData[i]],
        onComplete: result => {
        let currentcid = this.PostData[i];
          let userDocument = result.data();
          this.posts.forEach(post => {
            if(post.creatorId === currentcid) {
              post.name = userDocument?.['publicName'],
              post.desc = userDocument?.['description']
            }
          })
        }
      }
    );
  };
}
getPosts() {
  this.firestore.getCollection(
    {
      path: ["Posts"],
      where: [
        new OrderBy("timestamp", "desc"),
        new Limit(100)
      ],
      onComplete: (result)=> {
        result.docs.forEach(
          doc => {
            let post = <PostData>doc.data();
            this.postCId = post.creatorId
            post.postId = doc.id;
            this.posts.push(post);
            this.getCreatorInfo();
          }
        ); 
      },
      onFail: err=> {

      }
    }
  )
}
}
export interface PostData {
  comment: string;
  creatorId: string;
  imageUrl?: string;
  name: string;
  desc: string;
  postId: string;
}