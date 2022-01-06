import { Injectable } from '@nestjs/common';
import { Like } from '../entities/likes.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeDto, LikePostIdDto, LikeUserIdDto } from './likes.dto';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async findAll(): Promise<Like[]> {
    return await this.likeRepository.find();
  }

  async findAllUser(LikeUserIdDto: LikeUserIdDto): Promise<Like[]> {
    const queryBuilder = this.likeRepository.createQueryBuilder('like');
    const result = queryBuilder
      .leftJoinAndSelect('like.post', 'post')
      .leftJoinAndSelect('post.user', 'user')
      .orderBy('post.createdAt', 'DESC')
      .where(LikeUserIdDto)
      .getMany();
    return result;
  }

  async findOne(LikeDto: LikeDto): Promise<Like> {
    return this.likeRepository.findOne(LikeDto);
  }

  async createOne(LikeDto: LikeDto) {
    return await this.likeRepository.save(LikeDto);
  }

  async deleteOne(LikeDto: LikeDto) {
    return await this.likeRepository.delete(LikeDto);
  }

  async count(LikePostIdDto: LikePostIdDto) {
    return await this.likeRepository.count(LikePostIdDto);
  }
}
