import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('informations')
export class Information {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  genre: string;

  @Column()
  content: string;

  @Column()
  title: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt?: Date;
}
