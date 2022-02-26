import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flash } from '../database/entities/flashes.entity';
import { FlashDto } from './flashes.dto';

@Injectable()
export class FlashesService {
  constructor(
    @InjectRepository(Flash)
    private readonly flashesRepository: Repository<Flash>,
  ) {}

  async findAll(): Promise<Flash[]> {
    const flashes = this.flashesRepository
      .createQueryBuilder('flash')
      .orderBy('flash.id', 'DESC')
      .leftJoinAndSelect('flash.user', 'user')
      .limit(10)
      .getMany();

    return await flashes;
  }

  async createOne(dto: FlashDto) {
    return await this.flashesRepository.save(dto);
  }

  async deleteOne(id: number) {
    return await this.flashesRepository.delete(id);
  }
}
