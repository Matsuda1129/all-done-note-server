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
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtService } from '@nestjs/jwt';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';
import { CreatePostDto } from './posts.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PostEntity } from './entities/posts.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiBearerAuth('token')
@UseGuards(AuthGuard)
@ApiTags('post')
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

  @Get()
  async findAll() {
    return await this.postService.findAll();
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
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
}
