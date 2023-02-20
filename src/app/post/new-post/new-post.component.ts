import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  formStaus: string = 'Add';
  permalink: string = '';
  imgSrc: any = '/assets/placeholer.png';
  selectedImage: any;
  categoriesArray: Category[] = [];

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((data) => {
      console.log(data);
      this.categoriesArray = data;
    });
  }

  onTitleChanged(event: any) {
    // console.log(event.target.value);
    const title = event.target.value;
    this.permalink = title.replace(/\s/g, '-');
    console.log(this.permalink);
  }

  showPreview(event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };

    reader.readAsDataURL(event.target.files[0]);
    this.selectedImage = event.target.files[0];
  }
}
