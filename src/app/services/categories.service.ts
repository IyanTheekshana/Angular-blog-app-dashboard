import { Injectable } from '@angular/core';
import { collection, Firestore } from '@angular/fire/firestore';
import { addDoc } from '@firebase/firestore';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private afs: Firestore, private toastr: ToastrService) {}

  saveData(categoryData: any) {
    let $categories = collection(this.afs, 'categories');
    addDoc($categories, categoryData)
      .then((docRef) => {
        this.toastr.success('Added Successfully', '', {
          timeOut: 3000,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
