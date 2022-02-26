import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  UseGuards,
  Param,
  Put,
} from '@nestjs/common';
import { MailsService } from './mails.service';
import { AuthGuard } from '../auth.guard';
import { CreateMailDto, EditMailDto } from './mails.dto';

@UseGuards(AuthGuard)
@Controller('mail')
export class MailsController {
  constructor(private readonly mailaService: MailsService) {}

  @Get()
  async findAll() {
    return await this.mailaService.findAll();
  }

  @Post()
  async createOne(@Body() dto: CreateMailDto) {
    return await this.mailaService.createOne(dto);
  }

  @Get('send/:userId')
  async findSendMail(@Param('userId') userId: number) {
    return await this.mailaService.findSendMail(userId);
  }

  @Get('recieved/:recipientId')
  async findRecievedMail(@Param('recipientId') recipientId: number) {
    return await this.mailaService.findRecievedMail(recipientId);
  }

  @Get(':id')
  async findById(@Param() id: number) {
    return await this.mailaService.findById(id);
  }

  @Put(':id/unread')
  async update(@Param('id') id: number, @Body() dto: EditMailDto) {
    return await this.mailaService.unread(id, dto);
  }

  @Delete('delete/:id')
  async deleteOne(@Param('id') id: number) {
    return await this.mailaService.deleteOne(id);
  }
}
