import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../database/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, EditUserDto, EditUserPicture, EditUserTodo } from './users.dto';
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

  async updateTodo(id: number, dto: EditUserTodo) {
    return await this.userRepository.update(id, dto);
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
    searchWord,
    gender,
    alive,
    selectAge,
    job,
    alone,
    isMarried,
    isParents,
    isSpouseParents,
    isChild,
    isChildren2,
    isChildren3,
    isOthers,
  ): Promise<Pagination<User>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder
      .where('user.name like :ids', { ids: `%${searchWord}%` })
      .andWhere('user.gender IN (:...gender)', { gender: [gender] })
      .andWhere('user.alive IN (:...alive)', { alive: [alive] })
      .andWhere('user.age IN (:...age)', { age: selectAge })
      .andWhere('user.job IN (:...job)', { job: [job] })
      .andWhere('user.alone IN (:...alone)', { alone: [alone] })
      .andWhere('user.isMarried IN (:...isMarried)', { isMarried: [isMarried] })
      .andWhere('user.isParents IN (:...isParents)', { isParents: [isParents] })
      .andWhere('user.isSpouseParents IN (:...isSpouseParents)', {
        isSpouseParents: [isSpouseParents],
      })
      .andWhere('user.isChild IN (:...isChild)', { isChild: [isChild] })
      .andWhere('user.isChildren2 IN (:...isChildren2)', { isChildren2: [isChildren2] })
      .andWhere('user.isChildren3 IN (:...isChildren3)', { isChildren3: [isChildren3] })
      .andWhere('user.isOthers IN (:...isOthers)', { isOthers: [isOthers] });
    return paginate<User>(queryBuilder, options);
  }

  async userDataAnalize(
    searchWord,
    gender,
    alive,
    selectAge,
    job,
    alone,
    isMarried,
    isParents,
    isSpouseParents,
    isChild,
    isChildren2,
    isChildren3,
    isOthers,
  ) {
    const queryBuilder = await this.userRepository
      .createQueryBuilder('user')
      .where('user.name like :ids', { ids: `%${searchWord}%` })
      .andWhere('user.gender IN (:...gender)', { gender: [gender] })
      .andWhere('user.alive IN (:...alive)', { alive: [alive] })
      .andWhere('user.age IN (:...age)', { age: selectAge })
      .andWhere('user.job IN (:...job)', { job: [job] })
      .andWhere('user.alone IN (:...alone)', { alone: [alone] })
      .andWhere('user.isMarried IN (:...isMarried)', { isMarried: [isMarried] })
      .andWhere('user.isParents IN (:...isParents)', { isParents: [isParents] })
      .andWhere('user.isSpouseParents IN (:...isSpouseParents)', {
        isSpouseParents: [isSpouseParents],
      })
      .andWhere('user.isChild IN (:...isChild)', { isChild: [isChild] })
      .andWhere('user.isChildren2 IN (:...isChildren2)', { isChildren2: [isChildren2] })
      .andWhere('user.isChildren3 IN (:...isChildren3)', { isChildren3: [isChildren3] })
      .andWhere('user.isOthers IN (:...isOthers)', { isOthers: [isOthers] })
      .getMany();
    return queryBuilder;
  }

}
