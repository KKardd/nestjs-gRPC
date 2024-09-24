import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private boardRepository: Repository<Post>,
  ) {}

  async createPost(title: string, content: string): Promise<Post> {
    const post = this.boardRepository.create({ title, content });
    return await this.boardRepository.save(post);
  }

  async getPost(id: number): Promise<Post> {
    return await this.boardRepository.findOne({ where: { id } });
  }

  async updatePost(id: number, title: string, content: string): Promise<Post> {
    return await this.boardRepository.save({ id, title, content });
  }

  async deletePost(id: number): Promise<void> {
    return await this.boardRepository.delete(id).then(() => undefined);
  }

  async listPosts(): Promise<Post[]> {
    return await this.boardRepository.find();
  }
}
