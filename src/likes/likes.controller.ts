import {
  Controller,
  Post,
  Delete,
  Body,
  Get,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtService } from '@nestjs/jwt';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';
import { LikeDto, LikePostIdDto, LikeUserIdDto } from './likes.dto';
import { Like } from 'src/database/entities/likes.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@UseGuards(AuthGuard)
@Controller('like')
export class LikesController {
  constructor(private readonly likeService: LikesService, private jwtService: JwtService) {}

  @Get()
  async findAll() {
    return await this.likeService.findAll();
  }
  @Post('user/page')
  async paginateSearched(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Body() LikeUserIdDto: LikeUserIdDto,
  ): Promise<Pagination<Like>> {
    limit = limit > 100 ? 100 : limit;
    const result = this.likeService.paginateSearched(
      {
        page,
        limit,
      },
      LikeUserIdDto,
    );

    return result;
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
