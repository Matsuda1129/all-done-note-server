import { Injectable } from '@nestjs/common';
import { PostEntity } from '../database/entities/posts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto, EditPostDto } from './posts.dto';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<PostEntity>> {
    const queryBuilder = this.postRepository.createQueryBuilder('post');
    queryBuilder.orderBy('post.id', 'DESC').leftJoinAndSelect('post.user', 'user');
    return paginate<PostEntity>(queryBuilder, options);
  }

  async paginateSearched(
    options: IPaginationOptions,
    searchWord: string,
  ): Promise<Pagination<PostEntity>> {
    const queryBuilder = this.postRepository.createQueryBuilder('post');
    queryBuilder
      .orderBy('post.id', 'DESC')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.content like :ids', { ids: `%${searchWord}%` });
    return paginate<PostEntity>(queryBuilder, options);
  }

  async paginateUserPosts(
    options: IPaginationOptions,
    searchId: number,
  ): Promise<Pagination<PostEntity>> {
    const queryBuilder = this.postRepository.createQueryBuilder('post');
    queryBuilder
      .orderBy('post.id', 'DESC')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.userId = :ids', { ids: `${searchId}` });
    return paginate<PostEntity>(queryBuilder, options);
  }

  async findAll(): Promise<PostEntity[]> {
    return await this.postRepository.find({ relations: ['user'] });
  }

  async createOne(dto: CreatePostDto) {
    const user = await this.postRepository.create(dto);
    return await this.postRepository.save(user);
  }

  async deleteOne(id: number) {
    return await this.postRepository.delete(id);
  }

  async findOneId(id: number): Promise<PostEntity> {
    return this.postRepository.findOne(id, { relations: ['user'] });
  }

  async editOne(id: number, dto: EditPostDto) {
    return this.postRepository.update(id, dto);
  }
}
