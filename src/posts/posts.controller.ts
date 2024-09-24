import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PostsService } from './posts.service';
import { PostRes, PostListRes } from './post.interface';
import { UpdatePostDto } from './dto/update-post-input.dto';
import { CreatePostDto } from './dto/create-post-input.dto';

@Controller()
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @GrpcMethod('PostsService', 'CreatePost')
  async createPost(data: CreatePostDto): Promise<PostRes> {
    const post = await this.postService.createPost(data.title, data.content);
    return { post };
  }

  @GrpcMethod('PostsService', 'GetPost')
  async getPost(data: { id: number }): Promise<PostRes> {
    const post = await this.postService.getPost(data.id);
    console.log(post);
    return { post };
  }

  @GrpcMethod('PostsService', 'UpdatePost')
  async updatePost(data: UpdatePostDto): Promise<PostRes> {
    const post = await this.postService.updatePost(
      data.id,
      data.title,
      data.content,
    );
    return { post };
  }

  @GrpcMethod('PostsService', 'DeletePost')
  async deletePost(data: { id: number }): Promise<void> {
    return await this.postService.deletePost(data.id);
  }

  @GrpcMethod('PostsService', 'ListPosts')
  async listPosts(): Promise<PostListRes> {
    const posts = await this.postService.listPosts();
    return { posts };
  }
}
