import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO, EditUserDto} from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // テーブルにアイテムを追加する関数を定義
  async createOne(dto: CreateUserDTO) {
    const user = await this.userRepository.create(dto as any);
    return await this.userRepository.save(user);
  }

  // idを指定してテーブルから1件のデータを取得する関数を定義
  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User does not exist');
    return user;
  }

  // idを指定してテーブルのデータを更新する関数を定義
  async update(id: number, dto : EditUserDto) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User does not exist');
    const editedUser = Object.assign(user, dto);
    return await this.userRepository.save(editedUser);
  }

  //  idを指定してテーブルのデータを削除する関数を定義
  async deleteOne(id: number){
    return await this.userRepository.delete(id);
  }
}
