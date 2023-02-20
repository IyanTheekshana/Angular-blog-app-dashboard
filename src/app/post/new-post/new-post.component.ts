import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  formStaus: string = 'Add New';
  permalink: string = '';
  imgSrc: any = '/assets/placeholer.png';
  selectedImage: any;
  categoriesArray: Category[] = [];
  post: any;
  postId: string = '';

  constructor(
    private categoryService: CategoriesService,
    private postService: PostsService,
    private route: ActivatedRoute
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

    this.route.queryParams.subscribe((data) => {
      this.postId = data['id'];
      this.postService.loadOneData(data['id']).subscribe((post) => {
        console.log(post);

        this.post = post;

        this.postForm = new FormGroup({
          title: new FormControl(this.post.title, [
            Validators.required,
            Validators.minLength(10),
          ]),
          permalink: new FormControl(this.post.permalink, Validators.required),
          excerpt: new FormControl(this.post.excerpt, [
            Validators.required,
            Validators.minLength(20),
          ]),
          category: new FormControl(
            `${this.post.category.categoryId}-${this.post.category.category}`,
            Validators.required
          ),
          postImg: new FormControl('', Validators.required),
          content: new FormControl(this.post.content, Validators.required),
        });

        this.imgSrc = this.post.postImgPath;
        this.formStaus = 'Edit';
      });
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
    let postData: IPost = {
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
    // console.log(postData);
    this.postService.uploadImage(
      this.selectedImage,
      postData,
      this.formStaus,
      this.postId
    );
    this.postForm.reset();
    this.imgSrc = '/assets/placeholer.png';
  }
}
