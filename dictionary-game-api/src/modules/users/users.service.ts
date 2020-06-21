import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../model/user.entity';
import { UserDTO } from './users.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  public async getAll(): Promise<UserDTO[]> {
    return await this.repo
      .find()
      .then(items => items.map(e => UserDTO.fromEntity(e)));
  }

  public async findOne(email: string): Promise<UserDTO | undefined> {
    return await this.repo
      .find({
        where: { email: email },
      })
      .then(users =>
        users?.length > 0 ? UserDTO.fromEntity(users[0]) : undefined,
      );
  }

  public async create(dto: UserDTO): Promise<UserDTO> {
    dto.password = await hash(dto.password, 10);
    return this.repo.save(dto.toEntity()).then(e => UserDTO.fromEntity(e));
  }
}
