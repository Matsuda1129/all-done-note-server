import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  BeforeInsert,
} from 'typeorm';
import { PostEntity } from './posts.entity';
import { Comment } from './comments.entity';
import { Like } from './likes.entity';
import * as bcrypt from 'bcryptjs';
import { Todo } from './todos.entity';
import { Mail } from './mails.entity';
import { Flash } from './flashes.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column('boolean', { default: true })
  alive: boolean;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 250, default: 'よろしくおねがいします' })
  introduction: string;

  @Column('boolean', { default: false })
  will: boolean;

  @Column({ type: 'mediumtext', nullable: true })
  movie: string;

  @Column({ type: 'varchar', default: 'treeIcon.jpg' })
  icon: string;

  @Column({ type: 'simple-array' })
  picture: string[];

  @Column({ type: 'varchar', length: 100, default: 'other' })
  gender: string;

  @Column({ nullable: true })
  birthday: string;

  @Column({ nullable: true, default: 0 })
  age: number;

  @Column({ nullable: true })
  savings: number;

  @Column('boolean', { default: false })
  alone: boolean;

  @Column('boolean', { default: false })
  isMarried: boolean;

  @Column('boolean', { default: false })
  isParents: boolean;

  @Column('boolean', { default: false })
  isSpouseParents: boolean;

  @Column('boolean', { default: false })
  isChild: boolean;

  @Column('boolean', { default: false })
  isChildren2: boolean;

  @Column('boolean', { default: false })
  isChildren3: boolean;

  @Column('boolean', { default: false })
  isOthers: boolean;

  @Column('boolean', { default: false })
  openData: boolean;

  @Column('boolean', { default: false })
  openDataAfterDie: boolean;

  @Column({ nullable: true, default: 'その他サービス業' })
  job: string;

  @Column({ default: 0 })
  goalMoney1: number;

  @Column({ default: 0 })
  goalMoney2: number;

  @Column({ default: 0 })
  goalMoney1Percent: number;

  @Column({ default: 0 })
  goalMoney2Percent: number;

  @Column({ default: 0 })
  allPercent: number;

  @Column({ default: 0 })
  preparationPercent: number;

  @Column({ default: 0 })
  moneyPercent: number;

  @Column({ default: 0 })
  todoPercent: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt?: Date;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment[];

  @OneToMany(() => Mail, (mail) => mail.user)
  mails: Mail[];

  @OneToMany(() => Mail, (mail) => mail.recipient)
  mails2: Mail[];

  @OneToMany(() => Flash, (flash) => flash.user)
  flash: Flash[];

  @OneToMany(() => Todo, (todo) => todo.user)
  @JoinTable()
  todos: Todo[];

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
