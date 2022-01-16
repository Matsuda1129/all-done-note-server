import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoDto, TodoGenreDto, TodoGroupDto } from './todos.dto';

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

  @Post('group')
  async findGroup(@Body() TodoGroupDto: TodoGroupDto) {
    return await this.todoService.findGroup(TodoGroupDto);
  }

  @Post()
  async findGenreT(@Body() TodoDto: TodoDto) {
    return await this.todoService.createOne(TodoDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() TodoDto: TodoDto) {
    return await this.todoService.update(id,TodoDto);
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
