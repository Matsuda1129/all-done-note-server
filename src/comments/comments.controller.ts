import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  UseGuards,
  Param,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '../auth.guard';
import { CommentDto } from './comments.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Comment } from '../database/entities/comment.entity';

@UseGuards(AuthGuard)
@Controller('comment')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get()
  async findAll() {
    return await this.commentService.findAll();
  }

  @Post()
  async createOne(@Body() CommentDto: CommentDto) {
    return await this.commentService.createOne(CommentDto);
  }

  @Delete()
  async deleteOne(@Body() id: number) {
    return await this.commentService.deleteOne(id);
  }

  @Get(':postId/page')
  async imdex2(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Param('postId') postId: number,
  ): Promise<Pagination<Comment>> {
    console.log(postId);
    limit = limit > 100 ? 100 : limit;
    const result = this.commentService.paginate(
      {
        page,
        limit,
      },
      postId,
    );

    return result;
  }

  @Post('count')
  async count(@Body() postId: number) {
    return await this.commentService.count(postId);
  }
}
