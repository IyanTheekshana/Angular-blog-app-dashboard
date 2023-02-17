import { Component } from '@angular/core';
import { collection, Firestore } from '@angular/fire/firestore';
import { addDoc, doc } from '@firebase/firestore';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  constructor(private afs: Firestore) {}

  onSubmit(formData: any) {
    // console.log(formData.value);
    let categoryData = {
      category: formData.value.category,
    };

    let subCategoryData = {
      subcategory: 'Sub Category 1',
    };

    let $categories = collection(this.afs, 'categories');
    addDoc($categories, categoryData)
      .then((docRef) => {
        // console.log(docRef);
        // //start: Sub category added
        // let $subcategories = collection(
        //   this.afs,
        //   `/categories/${docRef.id}/subcategory`
        // );
        // addDoc($subcategories, subCategoryData)
        //   .then((docRef) => {
        //     console.log(docRef);
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //   });
        // //finished: Sub category added
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
