import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryArray: Category[] = [];
  formCategory: string = '';
  formStaus: string = 'Add New';
  categoryId: string = '';

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((data) => {
      // console.log(data);
      this.categoryArray = data;
    });
  }

  onSubmit(formData: any) {
    let categoryData: Category = {
      id: formData.value.id,
      category: formData.value.category,
    };

    if (this.formStaus == 'Edit') {
      this.categoryService.updateData(this.categoryId, formData.value.category);
    } else if (this.formStaus == 'Add New') {
      this.categoryService.saveData(categoryData);
    }
  }

  onEdit(category: string, id: any) {
    this.formCategory = category;
    this.formStaus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id: any) {
    this.categoryService.deleteData(id);
  }
}
