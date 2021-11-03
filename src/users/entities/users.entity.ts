import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column('boolean', { default: true })
  alive: boolean;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  will: string;

  @Column({ type: 'mediumtext', nullable: true })
  movie: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  sex: string;

  @Column({ nullable: true })
  birthday: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt?: Date;
}
