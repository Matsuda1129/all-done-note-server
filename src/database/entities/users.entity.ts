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
import { Comment } from './comment.entity';
import { Like } from './likes.entity';
import * as bcrypt from 'bcryptjs';
import { Todo } from './todos.entity';
import { Mail } from './mails.entity';

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

  @Column({ type: 'varchar', length: 250 })
  introduction: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  will: string;

  @Column({ type: 'mediumtext', nullable: true })
  movie: string;

  @Column({ type: 'varchar', nullable: true })
  picture: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  gender: string;

  @Column({ nullable: true })
  birthday: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  savings: number;

  @Column({ nullable: true, type: 'simple-array' })
  family: string[];

  @Column({ nullable: true })
  job: string;

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

  @OneToMany(() => Todo, (todo) => todo.user)
  @JoinTable()
  todos: Todo[];

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}