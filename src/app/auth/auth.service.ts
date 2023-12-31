import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { Md5 } from 'ts-md5';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {
  user: Observable<User> | Observable<null>;
  authState: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

    this.afAuth.authState.subscribe((data) => {
      this.authState = data;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUsrId(): string {
    return this.authenticated ? this.authState.uid : null;
  }

  emailSignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => console.log('You have successfully sign in'))
      .catch((error) => console.log(error.message));
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => this.updateUserData(result.user))
      .then(() => console.log('Welcome, your account has been created'))
      .then(() => {
        this.afAuth.currentUser
          .then((user) => {
            user.sendEmailVerification();
          })
          .then(() => console.log('We sent you an email verification'))
          .catch((error) => console.log(error.message));
      })
      .catch((error) => console.log(error.message));
  }

  resetPassword(email: string) {
    return this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => console.log("We've sent you a password reset link"))
      .catch((error) => console.log(error.message));
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL:
        user.photoURL ||
        'http://www.gravatar.com/avatar/' +
          Md5.hashStr(user.uid) +
          '?d=identicon',
    };
    return userRef.set(data, { merge: true });
  }
}
