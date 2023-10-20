import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  galleryCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore, private auth: AuthService) {}

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
}
