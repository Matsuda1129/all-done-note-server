import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('comments')
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  postId: number;

  @Column()
  comment: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt?: Date;
}
