import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
  uploadBytesResumable,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private storage: Storage) {}

  uploadImage(event: any, postData: any) {
    const file = event;
    const filePath = ref(this.storage, `postIMG/${Date.now()}`);
    const uploadedImage = uploadBytesResumable(filePath, file);

    uploadBytes(filePath, file).then((snapshot) => {
      getDownloadURL(uploadedImage.snapshot.ref).then((url) => {
        postData.postImgPath = url;
      });
    });
  }
}
