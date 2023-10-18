import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from '../post.model';
import { PostService } from '../post.service';

import { Observable, Subscription, finalize } from 'rxjs';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css'],
})
export class PostDashboardComponent implements OnInit, OnDestroy {
  taskSubscription: Subscription;
  downloadURLSubscription: Subscription;
  postForm: FormGroup;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  imageURL: string = null;

  task: AngularFireUploadTask;

  constructor(
    private postService: PostService,
    private storage: AngularFireStorage,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.postForm = this.fb.group({
      title: [''],
      content: [''],
      draf: false,
    });
  }

  savePost() {
    const formData: Post = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUsrId,
      title: this.postForm.get('title').value,
      image: this.imageURL,
      content: this.postForm.get('content').value,
      draf: this.postForm.get('draf').value || false,
      published: new Date(),
      trending: 0,
    };

    if (!this.postForm.untouched) {
      this.postService.create(formData);
      this.postForm.reset();
      this.imageURL = null;
    }
  }

  uploadPostImage(event) {
    const file = event.target.files[0];
    const path = `posts/${file.name}`;
    const storageRef = this.storage.ref(path);

    if (file.type.split('/')[0] !== 'image') {
      return alert('Only images allowed');
    } else {
      this.task = this.storage.upload(path, file);

      this.taskSubscription = this.task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            storageRef.getDownloadURL().subscribe((url) => {
              // this.userService.updateProfileData(this.user.displayName, url);
              console.log(url);
            });

            this.downloadURL = storageRef.getDownloadURL();
            this.uploadPercent = this.task.percentageChanges();
            this.downloadURLSubscription = this.downloadURL.subscribe(
              (url) => (this.imageURL = url)
            );
          })
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
      this.downloadURLSubscription.unsubscribe();
    }
  }
}
