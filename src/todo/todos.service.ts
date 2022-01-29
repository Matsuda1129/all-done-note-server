import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../database/entities/todos.entity';
import { TodoDto, TodoGenreDto, TodoGroupDto, TodoGenreFinishDto } from './todos.dto';

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
  }

  async findGenreFinish(TodoGenreFinishDto: TodoGenreFinishDto): Promise<Todo[]> {
    const queryBuilder = this.todosRepository.createQueryBuilder('todo');
    const result = queryBuilder.where(TodoGenreFinishDto).getMany();

    return result;
  }

  async findGroup(TodoGroupDto: TodoGroupDto): Promise<Todo[]> {
    const queryBuilder = this.todosRepository.createQueryBuilder('todo');
    const result = queryBuilder.where(TodoGroupDto).getMany();

    return result;
  }

  async findOne(any: any) {
    return this.todosRepository.findOne(any);
  }

  async createOne(TodoDto: TodoDto) {
    return await this.todosRepository.save(TodoDto);
  }

  async update(id: number, TodoDto: TodoDto) {
    const todo = await this.todosRepository.findOne(id);
    const editedTodo = Object.assign(todo, TodoDto);
    return await this.todosRepository.save(editedTodo);
  }

  async deleteOne(any: any) {
    return await this.todosRepository.delete(any);
  }
}
