import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../entities/todos.entity';
import { TodoDto, TodoGenreDto } from './todos.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return await this.todosRepository.find();
  }

  async findGenre(TodoGenreDto: TodoGenreDto): Promise<Todo[]> {
    const queryBuilder = this.todosRepository.createQueryBuilder('todo');
    const result = queryBuilder.where(TodoGenreDto).getMany();

    return result;
    // return await this.todosRepository.find();
  }

  async findOne(any: any) {
    return this.todosRepository.findOne(any);
  }

  async createOne(TodoDto: TodoDto) {
    return await this.todosRepository.save(TodoDto);
  }

  async deleteOne(any: any) {
    return await this.todosRepository.delete(any);
  }
}
