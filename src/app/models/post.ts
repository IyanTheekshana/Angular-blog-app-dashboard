export interface IPost {
  title: string;
  permalink: string;
  category: {
    categoryId: string;
    category: string;
  };
  postImgPath: string;
  excerpt: string;
  content: string;
  isFeatured: boolean;
  views: number;
  status: string;
  createdAt: Date;
}
