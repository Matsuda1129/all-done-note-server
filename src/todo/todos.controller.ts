import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoDto, TodoGenreDto } from './todos.dto';

@Controller('todo')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get()
  async findAll() {
    return await this.todoService.findAll();
  }

  @Post('genre')
  async findGenre(@Body() TodoGenreDto: TodoGenreDto) {
    return await this.todoService.findGenre(TodoGenreDto);
  }

  @Post()
  async findGenreT(@Body() TodoDto: TodoDto) {
    return await this.todoService.createOne(TodoDto);
  }

  @Delete()
  async deleteOne(@Body() data: any) {
    const result = await this.todoService.deleteOne(data);
    return {
      message: 'success deleted',
      result,
    };
  }
}
