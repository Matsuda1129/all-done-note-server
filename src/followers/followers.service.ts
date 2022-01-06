import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follower } from '../entities/followers.entity';
import { FollowerCountDto, FollowerDto, FollowingCountDto } from './followers.dto';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(Follower)
    private readonly followerRepository: Repository<Follower>,
  ) {}

  async findAll(): Promise<Follower[]> {
    return await this.followerRepository.find();
  }

  async findOne(FollowerDto: FollowerDto) {
    return this.followerRepository.findOne(FollowerDto);
  }

  async createOne(FollowerDto: FollowerDto) {
    return await this.followerRepository.save(FollowerDto);
  }

  async deleteOne(FollowerDto: FollowerDto) {
    return await this.followerRepository.delete(FollowerDto);
  }

  async count(FollowerCountDto: FollowerCountDto) {
    return await this.followerRepository.count(FollowerCountDto);
  }

  async countFollowing(FollowingCountDto: FollowingCountDto) {
    return await this.followerRepository.count(FollowingCountDto);
  }
}
