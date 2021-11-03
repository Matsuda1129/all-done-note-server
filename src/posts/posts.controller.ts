import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  BadRequestException,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';
import { CreatePostDTO } from './posts.dto';

@UseGuards(AuthGuard)
@Controller('post')
export class PostsController {
  constructor(private readonly postService: PostsService, private jwtService: JwtService) {}

  @Get()
  async getPosts() {
    return await this.postService.findAll();
  }

  @Post()
  async addPost(@Body() Post: CreatePostDTO) {
    return await this.postService.createOne(Post);
  }
}
