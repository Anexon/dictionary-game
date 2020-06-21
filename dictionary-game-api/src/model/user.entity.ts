import { Entity, Column, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user' })
@Unique(['email'])
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column({ type: 'varchar', length: 300 })
  password: string;

  @Column({ type: 'bytea', length: 300 })
  name: string;
}
