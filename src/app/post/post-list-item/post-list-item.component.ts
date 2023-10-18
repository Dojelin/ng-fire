import { Component, Input, OnDestroy } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { Observable, Subscription, finalize } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css'],
})
export class PostListItemComponent implements OnDestroy {
  @Input() post: Post;
  editing = false;

  taskSubscription: Subscription;
  downloadURLSubscription: Subscription;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  imageURL: string = null;

  task: AngularFireUploadTask;

  constructor(
    private postService: PostService,
    public auth: AuthService,
    private storage: AngularFireStorage
  ) {}

  delete(id: string) {
    this.postService.delete(id);
  }

  update() {
    const formData = {
      title: this.post.title,
      image: this.imageURL || this.post.image,
      content: this.post.content,
      draf: this.post.draf,
    };
    this.postService.update(this.post.id, formData);
    this.editing = false;
  }

  trending(value: number) {
    if (this.post.id) {
      this.postService.update(this.post.id, { trending: value + 1 });
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
