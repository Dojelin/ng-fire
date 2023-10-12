import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userCollection: AngularFirestoreCollection<User>;
  constructor(private afs: AngularFirestore) {}

  getUsers() {
    this.userCollection = this.afs.collection('users');
    return this.userCollection.valueChanges();
  }
}
