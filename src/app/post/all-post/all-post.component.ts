import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css'],
})
export class AllPostComponent implements OnInit {
  postArray: IPost[] = [];

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.postService.loadData().subscribe((data) => {
      this.postArray = data;
    });
  }

  formatDate(dateAt: any) {
    let seconds = dateAt.seconds * 1000;
    return seconds;
  }

  onDelete(id: any, path: string) {
    this.postService.deleteImage(path);
    this.postService.deleteData(id);
  }

  onFeatured(id: any, value: boolean) {
    const featuredData = {
      isFeatured: value,
    };
    this.postService.markFeatured(id, featuredData);
  }
}
