import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameDTO } from './games.dto';
import { Game } from '../../model/game.entity';
@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private readonly repo: Repository<Game>,
  ) {}

  public async getAll(): Promise<GameDTO[]> {
    return await this.repo
      .find()
      .then(items => items.map(e => GameDTO.fromEntity(e)));
  }

  public async findOne(email: string): Promise<GameDTO | undefined> {
    return await this.repo
      .find({
        where: { email: email },
      })
      .then(games =>
        games?.length > 0 ? GameDTO.fromEntity(games[0]) : undefined,
      );
  }

  public async create(dto: GameDTO): Promise<GameDTO> {
    return this.repo.save(dto.toEntity()).then(e => GameDTO.fromEntity(e));
  }
}
