import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { PostEntity } from './posts.entity';
import { Like } from './likes.entity';
import { Todo } from 'src/entities/todos.entity';
import { SharedProp } from 'src/helpers/sharedProp.helpers';

@Entity('users')
export class User extends SharedProp {
  // constructor(name: string, email: string, password: string) {
  //   super();
  //   (this.name = name), (this.email = email), (this.password = password);
  // }

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

  // @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  // readonly createdAt?: Date;

  // @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  // readonly updatedAt?: Date;

  @OneToMany(() => PostEntity, (post) => post.user, { cascade: true })
  @JoinTable()
  posts: PostEntity[];

  @OneToMany(() => Like, (like) => like.user, { cascade: true })
  @JoinTable()
  likes: Like[];

  @OneToMany(() => Todo, (todo) => todo.user, { cascade: true })
  @JoinTable()
  todos: Todo[];
}
