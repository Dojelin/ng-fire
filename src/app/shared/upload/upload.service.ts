import { Injectable, OnDestroy } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { Observable, Subscription, finalize } from 'rxjs';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root',
})
export class UploadService implements OnDestroy {
  downloadURL: Observable<string>;

  taskSubscription: Subscription;
  downloadURLSubscription: Subscription;

  uploads: AngularFirestoreCollection<any>;
  task: AngularFireUploadTask;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  uploadTask(path, file, meta, uploadAsCollection) {
    const nameHash = Md5.hashStr(file.name + new Date().getTime());
    const fileExt = file.type.split('/')[1];
    const name = `${nameHash}.${fileExt}`;

    const ref = this.storage.ref(`${path}/${name}`);
    this.task = ref.put(file, { customMetadata: meta });

    this.taskSubscription = this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe((url) => {
            console.log(url);
          });

          if (uploadAsCollection == true) {
            // save as a collection
            this.downloadURL = ref.getDownloadURL();
            this.uploads = this.afs.collection(path);
            this.downloadURLSubscription = this.downloadURL.subscribe((url) => {
              const data = { name, url };
              this.uploads.add(data);
            });
          } else {
            // save as a document. To use this option we have to delete the last part of the path
            // `users/${user.uid}   ....   NO this part => /uploads`;
            // this going to overwrite the same field
            this.downloadURLSubscription = this.downloadURL.subscribe((url) => {
              this.afs.doc(path).update({ url });
            });
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
      this.downloadURLSubscription.unsubscribe();
    }
  }
}
