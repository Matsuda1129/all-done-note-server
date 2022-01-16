import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../database/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, EditUserDto, EditUserPicture } from './users.dto';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    for (var i = 0; i < users.length; i++) {
      delete users[i].password;
    }
    return users;
  }

  async createOne(dto: CreateUserDto) {
    const emailExist = await this.userRepository.findOne({ email: dto.email });
    if (emailExist) throw new BadRequestException('User already registered with email');
    const nameExist = await this.userRepository.findOne({ name: dto.name });
    if (nameExist) throw new BadRequestException('User already registered with name');
    const user = await Object.assign(dto);
    return await this.userRepository.save(user);
  }

  async update(id: number, dto: EditUserDto) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User does not exist');
    const editedUser = Object.assign(user, dto);
    return await this.userRepository.save(editedUser);
  }

  async updatePicture(id: number, dto: EditUserPicture) {
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

  async findOne(data: any): Promise<User> {
    return this.userRepository.findOne(data);
  }

  async paginateSearched(
    options: IPaginationOptions,
    searchWord: string,
    gender: string,
    age: number,
  ): Promise<Pagination<User>> {
    let selectAge = [];
    if (!age) {
      for (let i = 0; selectAge.length < 150; i++) {
        selectAge.push(i);
      }
    } else {
      for (let i = age; selectAge.length < 10; i++) {
        selectAge.push(i);
      }
    }

    let selectGender = [];
    if (gender === '') {
      selectGender.push('man', 'woman', 'other');
    } else {
      selectGender.push(gender);
    }
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder
      .where('user.name like :ids', { ids: `%${searchWord}%` })
      .andWhere('user.gender IN (:...gender)', { gender: selectGender })
      .andWhere('user.age IN (:...age)', { age: selectAge });
    return paginate<User>(queryBuilder, options);
  }
}
