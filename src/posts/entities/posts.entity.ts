import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { Like } from '../../likes/entities/likes.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  content: string;

  // @Column({ type: 'blob' })
  // picture: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinTable()
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => Like, (like) => like.post)
  @JoinTable()
  likes: Like[];
}
