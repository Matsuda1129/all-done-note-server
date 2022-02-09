import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { Comment } from '../database/entities/comments.entity';
import { CommentDto } from './comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return await this.commentsRepository.find({ relations: ['user'] });
  }

  async createOne(CommentDto: CommentDto) {
    return await this.commentsRepository.save(CommentDto);
  }

  async deleteOne(id: number) {
    return await this.commentsRepository.delete(id);
  }

  async paginate(options: IPaginationOptions, postId: number): Promise<Pagination<Comment>> {
    const queryBuilder = this.commentsRepository.createQueryBuilder('comment');
    queryBuilder
      .orderBy('comment.updatedAt', 'DESC')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.postId = :postId', { postId: postId });

    return paginate<Comment>(queryBuilder, options);
  }

  async count(postId) {
    return await this.commentsRepository.count(postId);
  }
}