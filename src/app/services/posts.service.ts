import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { Router } from '@angular/router';
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
    private toastr: ToastrService,
    private router: Router
  ) {}

  uploadImage(event: any, postData: any, formStatus: string, id: string) {
    const file = event;
    const filePath = ref(this.storage, `postIMG/${Date.now()}`);
    const uploadedImage = uploadBytesResumable(filePath, file);

    uploadBytes(filePath, file).then((snapshot) => {
      getDownloadURL(uploadedImage.snapshot.ref).then((url) => {
        postData.postImgPath = url;

        if (formStatus == 'Edit') {
          this.updateData(id, postData);
        } else {
          //////////////
          this.saveData(postData);
          //////////////
        }
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

  loadOneData(id: any) {
    let $posts = doc(this.afs, `posts`, id);
    return docData($posts, { idField: 'id' }) as Observable<IPost[]>;
  }

  updateData(id: string, postData: IPost) {
    let $posts = doc(this.afs, `posts/${id}`);
    setDoc($posts, postData)
      .then((docRef) => {
        this.toastr.success('Edited Successfully', '', {
          timeOut: 3000,
        });
        this.router.navigate(['/all-posts']);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteImage(path: string) {
    const filePath = ref(this.storage, path);
    deleteObject(filePath)
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  }

  deleteData(id: string) {
    let $posts = doc(this.afs, `posts/${id}`);
    return deleteDoc($posts)
      .then((docRef) => {
        this.toastr.success('Deleted Successfully', '', {
          timeOut: 3000,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  markFeatured(id: any, featuredData: any) {
    let $posts = doc(this.afs, `posts`, id);
    updateDoc($posts, featuredData)
      .then((docRef) => {
        this.toastr.info('Featured status updated', '', {
          timeOut: 2000,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
