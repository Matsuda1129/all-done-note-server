import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';

import { AuthGuard } from '../auth.guard';

@UseGuards(AuthGuard)
@Controller('comment')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get()
  async findAll() {
    return await this.commentService.findAll();
  }
}
