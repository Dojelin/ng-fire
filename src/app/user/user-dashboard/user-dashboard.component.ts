import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

import { finalize } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent {
  editing = false;
  user: User;

  task: AngularFireUploadTask;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private storage: AngularFireStorage,
    private location: Location
  ) {
    this.getUser();
  }

  getUser() {
    return this.auth.user.subscribe((user) => {
      this.user = user;
    });
  }

  uploadPhotoURL(event) {
    const file = event.target.files[0];
    const path = `users/${this.user.uid}/photo/${file.name}`;
    const storageRef = this.storage.ref(path);

    if (file.type.split('/')[0] !== 'image') {
      return alert('Only images allowed');
    } else {
      this.task = this.storage.upload(path, file);

      this.task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            storageRef.getDownloadURL().subscribe((url) => {
              this.userService.updateProfileData(this.user.displayName, url);
            });
          })
        )
        .subscribe();
    }
  }

  updateProfile() {
    return this.userService.updateProfileData(
      this.user.displayName,
      this.user.photoURL
    );
  }
  updateEmail() {
    return this.userService.updateEmailData(this.user.email);
  }

  updateUser() {
    const data = {
      website: this.user.website || null,
      location: this.user.location || null,
      bio: this.user.bio || null,
    };

    this.userService.updateUserData(data);
  }

  goBack() {
    this.location.back();
  }
}
