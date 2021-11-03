import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO, EditUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async createOne(dto: CreateUserDTO) {
    const user = await this.userRepository.create(dto as any);
    return await this.userRepository.save(user);
  }

  async findOneId(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User does not exist');
    return user;
  }

  async update(id: number, dto: EditUserDto) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User does not exist');
    const editedUser = Object.assign(user, dto);
    return await this.userRepository.save(editedUser);
  }

  async deleteOne(id: number) {
    return await this.userRepository.delete(id);
  }

  async create(data: any) {
    return this.userRepository.save(data);
  }

  async findOne(condition: any): Promise<User> {
    return this.userRepository.findOne(condition);
  }
}
