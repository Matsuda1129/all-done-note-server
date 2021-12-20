import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { PostEntity } from '../../posts/entities/posts.entity';
import { Like } from '../../likes/entities/likes.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 150 })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 150 })
  email: string;

  @ApiProperty()
  @Column('boolean', { default: true })
  alive: boolean;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  password: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 250 })
  introduction: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100, nullable: true })
  will: string;

  @ApiProperty()
  @Column({ type: 'mediumtext', nullable: true })
  movie: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100, nullable: true })
  gender: string;

  @ApiProperty()
  @Column({ nullable: true })
  birthday: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt?: Date;

  @OneToMany(() => PostEntity, (post) => post.user)
  @JoinTable()
  posts: PostEntity[];

  @OneToMany(() => Like, (like) => like.user)
  @JoinTable()
  likes: Like[];
}
