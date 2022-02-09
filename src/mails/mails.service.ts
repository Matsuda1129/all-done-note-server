import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mail } from '../database/entities/mails.entity';
import { CreateMailDto, EditMailDto } from './mails.dto';

@Injectable()
export class MailsService {
  constructor(
    @InjectRepository(Mail)
    private readonly mailsRepository: Repository<Mail>,
  ) {}

  async findAll(): Promise<Mail[]> {
    return await this.mailsRepository.find();
  }

  async createOne(dto: CreateMailDto) {
    return await this.mailsRepository.save(dto);
  }

  async findRecivedMail(recipientId) {
    return await this.mailsRepository.find(recipientId);
  }

  async findSendMail(userId) {
    const queryBuilder = this.mailsRepository
      .createQueryBuilder('mail')
      .orderBy('mail.createdAt', 'DESC')
      .leftJoinAndSelect('mail.user', 'user')
      .leftJoinAndSelect('mail.recipient', 'recipient')
      .where('mail.ownerId = :owner', { owner: userId })
      .andWhere('mail.userId = :ids', { ids: userId })
      .getMany();

    return queryBuilder;
  }

  async findRecievedMail(recipientId) {
    const queryBuilder = this.mailsRepository
      .createQueryBuilder('mail')
      .orderBy('mail.createdAt', 'DESC')
      .leftJoinAndSelect('mail.user', 'user')
      .leftJoinAndSelect('mail.recipient', 'recipient')
      .where('mail.ownerId = :owner', { owner: recipientId })
      .andWhere('mail.recipientId = :ids', { ids: recipientId })
      .getMany();

    return queryBuilder;
  }

  async findById(id: any) {
    return await this.mailsRepository.findOne(id, { relations: ['user', 'recipient'] });
  }

  async unread(id: number, dto: EditMailDto) {
    return await this.mailsRepository.update(id, dto);
  }

  async deleteOne(id: number) {
    return await this.mailsRepository.delete(id);
  }
}
