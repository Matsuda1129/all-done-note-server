import { Controller, Post, Delete, Body, Get } from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtService } from '@nestjs/jwt';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LikeDto, LikePostIdDto, LikeUserIdDto } from './likes.dto';

@ApiBearerAuth('token')
@UseGuards(AuthGuard)
@ApiTags('like')
@Controller('like')
export class LikesController {
  constructor(private readonly likeService: LikesService, private jwtService: JwtService) {}

  @Get()
  async findAll() {
    return await this.likeService.findAll();
  }
  @Post('user')
  async findAllUser(@Body() LikeUserIdDto: LikeUserIdDto) {
    return await this.likeService.findAllUser(LikeUserIdDto);
  }

  @Post('get')
  async findOne(@Body() LikeDto: LikeDto) {
    return await this.likeService.findOne(LikeDto);
  }

  @Post()
  async createOne(@Body() LikeDto: LikeDto) {
    return await this.likeService.createOne(LikeDto);
  }

  @Delete()
  async deleteOne(@Body() LikeDto: LikeDto) {
    const result = await this.likeService.deleteOne(LikeDto);
    return {
      message: 'success deleted',
      result,
    };
  }

  @Post('count')
  async count(@Body() LikePostIdDto: LikePostIdDto) {
    return await this.likeService.count(LikePostIdDto);
  }
}
