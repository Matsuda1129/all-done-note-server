import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtService } from '@nestjs/jwt';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';
import { CreatePostDto, EditPostDto } from './posts.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PostEntity } from '../database/entities/posts.entity';
@UseGuards(AuthGuard)
@Controller('post')
export class PostsController {
  constructor(private readonly postService: PostsService, private jwtService: JwtService) {}

  @Get('page')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ): Promise<Pagination<PostEntity>> {
    limit = limit > 100 ? 100 : limit;
    return this.postService.paginate({
      page,
      limit,
    });
  }

  @Get(':searchWord/page')
  async index2(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Param('searchWord') searchWord: string,
  ): Promise<Pagination<PostEntity>> {
    limit = limit > 100 ? 100 : limit;
    const result = this.postService.paginateSearched(
      {
        page,
        limit,
      },
      searchWord,
    );

    return result;
  }

  @Post('searchId/page')
  async paginateUserPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Body('searchId') searchId: number,
  ): Promise<Pagination<PostEntity>> {
    limit = limit > 100 ? 100 : limit;
    const result = this.postService.paginateUserPosts(
      {
        page,
        limit,
      },
      searchId,
    );

    return result;
  }

  @Get()
  async findAll() {
    return await this.postService.findAll();
  }

  @Get(':id')
  async getPost(@Param('id') id: number) {
    return await this.postService.findOneId(Number(id));
  }

  @Post()
  async addPost(@Body() Post: CreatePostDto) {
    return await this.postService.createOne(Post);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    const result = this.postService.deleteOne(id);
    return {
      message: 'success deleted',
      result,
    };
  }

  @Put('update/:id')
  async editPost(@Param('id') id: number, @Body() dto: EditPostDto) {
    return await this.postService.editOne(id, dto);
  }
}
