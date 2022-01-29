import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Information } from 'src/database/entities/information.entity';
import { AuthGuard } from '../auth.guard';
import { InformationService } from './information.service';

@UseGuards(AuthGuard)
@Controller('information')
export class InformationController {
  constructor(private readonly informationService: InformationService) {}

  @Get()
  async findAll() {
    return await this.informationService.findAll();
  }

  @Get('genre')
  async findGenre() {
    return await this.informationService.findGenre();
  }

  @Post()
  async createOne(@Body() any: any) {
    return await this.informationService.createOne(any);
  }

  @Post('/page')
  async paginateSearched(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Body('searchTitle') searchTitle: string,
    @Body('searchGenre') searchGenre: string,
  ): Promise<Pagination<Information>> {
    const allData = await this.informationService.findGenre();
    let selectGenre;
    if (searchGenre === undefined) {
      selectGenre = allData;
    } else {
      selectGenre = [searchGenre];
    }
    limit = limit > 100 ? 100 : limit;
    const result = this.informationService.paginateSearched(
      {
        page,
        limit,
      },
      searchTitle,
      selectGenre,
    );
    return result;
  }
}
