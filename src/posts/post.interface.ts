export interface Post {
  id: number;
  title: string;
  content: string;
}

export interface PostRes {
  post: Post;
}

export interface PostListRes {
  posts: Post[];
}
