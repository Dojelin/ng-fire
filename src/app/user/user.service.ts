import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;

  constructor(private afs: AngularFirestore, private auth: AuthService) {}

  getUsers() {
    this.userCollection = this.afs.collection('users');
    return this.userCollection.valueChanges();
  }

  getUser(id: string) {
    this.userDoc = this.afs.doc<User>(`users/${id}`);
    return this.userDoc.valueChanges();
  }

  updateProfileData(displayName: string, photoURL: string) {
    const user = this.auth.authState;
    const data = { displayName, photoURL };
    return user
      .updateProfile(data)
      .then(() =>
        this.afs.doc(`users/${user.uid}`).update({ displayName, photoURL })
      )
      .then(() => console.log('Your profile has been updated!'))
      .catch((error) => console.log(error.message));
  }

  updateEmailData(email: string) {
    const user = this.auth.authState;
    console.log('enviando email');
    return user
      .verifyBeforeUpdateEmail(email)
      .then(() => this.afs.doc(`users/${user.uid}`).update({ email }))
      .then(() => console.log('Your email has been updated'))
      .catch((error) => console.log(error.message));
  }

  updateUserData(data: any) {
    const uid = this.auth.currentUsrId;
    return this.afs.doc(`users/${uid}`).update(data);
  }
}
