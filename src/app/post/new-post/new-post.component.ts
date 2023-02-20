import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { IPost } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  postForm: FormGroup;
  formStaus: string = 'Add';
  permalink: string = '';
  imgSrc: any = '/assets/placeholer.png';
  selectedImage: any;
  categoriesArray: Category[] = [];

  constructor(
    private categoryService: CategoriesService,
    private postService: PostsService
  ) {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      permalink: new FormControl('', Validators.required),
      excerpt: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
      category: new FormControl('', Validators.required),
      postImg: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.categoryService.loadData().subscribe((data) => {
      // console.log(data);
      this.categoriesArray = data;
    });
  }

  get fc() {
    return this.postForm?.controls;
  }

  onTitleChanged(event: any) {
    // console.log(event.target.value);
    const title = event.target.value;
    this.permalink = title.replace(/\s/g, '-');
    // console.log(this.permalink);
  }

  showPreview(event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };

    reader.readAsDataURL(event.target.files[0]);
    this.selectedImage = event.target.files[0];
  }

  onSubmit() {
    // console.log(this.postForm.value);
    let splitted = this.postForm.value.category.split('-');
    const postData: IPost = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };
    console.log(postData);
    this.postService.uploadImage(this.selectedImage, postData);
  }
}
