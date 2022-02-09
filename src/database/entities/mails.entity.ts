import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity('mails')
export class Mail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ownerId: number;

  @Column()
  userId: number;

  @Column()
  recipientId: number;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column()
  unread: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.mails, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate:'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => User, (recipient) => recipient.mails2, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate:'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'recipientId' })
  recipient: User;
}
