import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Information } from 'src/database/entities/information.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InformationService {
  constructor(
    @InjectRepository(Information)
    private readonly informationRepository: Repository<Information>,
  ) {}

  async findAll(): Promise<Information[]> {
    return await this.informationRepository.find();
  }

  async createOne(any: any) {
    return await this.informationRepository.save(any);
  }
}
