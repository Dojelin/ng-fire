import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  galleryCollection: AngularFirestoreCollection<any>;
  galleryDoc: AngularFirestoreDocument<any>;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private storage: AngularFireStorage
  ) {}

  getImages() {
    const uid = this.auth.currentUsrId;
    this.galleryCollection = this.afs.collection(`users/${uid}/gallery`);

    return this.galleryCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  getImage(id: string) {
    const uid = this.auth.currentUsrId;
    this.galleryDoc = this.afs.doc(`users/${uid}/gallery/${id}`);

    return this.galleryDoc.valueChanges();
  }

  deleteImage(id: string, name: string) {
    const uid = this.auth.currentUsrId;
    const imageRef = this.storage
      .ref(`users/${uid}/gallery`)
      .child(name)
      .delete();

    console.log('Image deleted from storage bucket');

    this.afs.doc(`users/${uid}/gallery/${id}`).delete();
    console.log('Image deleted from database');
  }
}
