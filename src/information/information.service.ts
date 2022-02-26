import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
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

  async findGenre() {
    const res = await this.informationRepository.find();
    const allGenre = [];

    for (let i = 0; i < res.length; i++) {
      allGenre.push(res[i].genre);
    }

    const array = [...new Set(allGenre)];
    return array;
  }

  async paginateSearched(
    options: IPaginationOptions,
    searchTitle: string,
    selectGenre: string,
  ): Promise<Pagination<Information>> {
    const queryBuilder = this.informationRepository.createQueryBuilder('information');
    queryBuilder
      .orderBy('information.id', 'DESC')
      .where('information.title like :ids', { ids: `%${searchTitle}%` })
      .andWhere('information.genre IN (:...genre)', { genre: selectGenre });
    return paginate<Information>(queryBuilder, options);
  }
}
