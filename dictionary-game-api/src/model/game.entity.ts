import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'game' })
export class Game extends BaseEntity {
  @ManyToMany(type => User)
  @JoinTable()
  users: User[];

  @Column({ type: 'varchar', length: 300 })
  status: string;
}
