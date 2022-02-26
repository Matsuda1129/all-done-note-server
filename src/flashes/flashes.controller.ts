import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FlashesService } from './flashes.service';
import { AuthGuard } from '../auth.guard';
import { FlashDto } from './flashes.dto';

@UseGuards(AuthGuard)
@Controller('flash')
export class FlashesController {
  constructor(private readonly flashesService: FlashesService) {}

  @Get()
  async findAll() {
    return await this.flashesService.findAll();
  }

  @Post()
  async create(@Body() dto: FlashDto) {
    return await this.flashesService.createOne(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.flashesService.deleteOne(id);
  }
}
