import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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

  @Post()
  async createOne(@Body() any: any) {
    return await this.informationService.createOne(any);
  }
}
