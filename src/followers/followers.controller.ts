import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowerCountDto, FollowerDto, FollowingCountDto } from './followers.dto';
import { AuthGuard } from '../auth.guard';

@UseGuards(AuthGuard)
@Controller('follower')
export class FollowersController {
  constructor(private readonly followerService: FollowersService) {}

  @Get()
  async findAll() {
    return await this.followerService.findAll();
  }

  @Post('findOne')
  async findOne(@Body() FollowerDto: FollowerDto) {
    return await this.followerService.findOne(FollowerDto);
  }

  @Post()
  async createOne(@Body() FollowerDto: FollowerDto) {
    return await this.followerService.createOne(FollowerDto);
  }

  @Delete()
  async deleteOne(@Body() FollowerDto: FollowerDto) {
    const result = await this.followerService.deleteOne(FollowerDto);
    return {
      message: 'success deleted',
      result,
    };
  }

  @Post('count')
  async count(@Body() FollowerCountDto: FollowerCountDto) {
    return await this.followerService.count(FollowerCountDto);
  }

  @Post('count/following')
  async countFollowing(@Body() FollowingCountDto: FollowingCountDto) {
    return await this.followerService.countFollowing(FollowingCountDto);
  }
}
