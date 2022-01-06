import { User } from 'src/entities/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'varchar', length: 45 })
  group: string;

  @Column({ type: 'varchar', length: 45 })
  genre: string;

  @Column({ type: 'varchar', length: 100 })
  listname: string;

  @Column('boolean', { default: true })
  finished: boolean;

  @Column('boolean', { default: true })
  lock: boolean;

  @Column('boolean', { default: true })
  before_die: boolean;

  @Column()
  money: number;

  @Column({ type: 'varchar', length: 1000 })
  memo: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.todos, {
    nullable: false,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinTable()
  user: User;
}
