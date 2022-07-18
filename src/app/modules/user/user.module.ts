import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostComponent } from './components/post/post.component';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { MatCardModule } from '@angular/material/card';
import { CommentComponent } from './components/comment/comment.component'
@NgModule({
  declarations: [
    UserDashboardComponent,
    HeaderComponent,
    ProfileComponent,
    PostComponent,
    CreatePostComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class UserModule { }
