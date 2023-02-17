import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc } from '@firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
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

  loadData() {
    let $categories = collection(this.afs, 'categories');
    return collectionData($categories, { idField: 'id' }) as Observable<
      Category[]
    >;
  }
}
