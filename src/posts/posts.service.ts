import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './entities/posts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDTO } from './posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async createOne(dto: CreatePostDTO) {
    const user = await this.postRepository.create(dto as any);
    return await this.postRepository.save(user);
  }
}
