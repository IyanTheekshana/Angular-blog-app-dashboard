import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { IPost } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private storage: Storage,
    private afs: Firestore,
    private toastr: ToastrService
  ) {}

  uploadImage(event: any, postData: any) {
    const file = event;
    const filePath = ref(this.storage, `postIMG/${Date.now()}`);
    const uploadedImage = uploadBytesResumable(filePath, file);

    uploadBytes(filePath, file).then((snapshot) => {
      getDownloadURL(uploadedImage.snapshot.ref).then((url) => {
        postData.postImgPath = url;
        //////////////
        this.saveData(postData);
        //////////////
      });
    });
  }

  saveData(postData: any) {
    let $posts = collection(this.afs, 'posts');
    addDoc($posts, postData)
      .then((docRef) => {
        this.toastr.success('Added Successfully', '', {
          timeOut: 3000,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  loadData() {
    let $posts = collection(this.afs, 'posts');
    return collectionData($posts, { idField: 'id' }) as Observable<IPost[]>;
  }
}
