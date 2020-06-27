import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, ValidateNested } from 'class-validator';
import { User } from '../../model/user.entity';
import { Game } from '../../model/game.entity';
export class GameDTO implements Readonly<GameDTO> {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @ValidateNested({ each: true })
  users: User[];

  public static from(dto: Partial<GameDTO>) {
    const it = new GameDTO();
    it.id = dto.id;
    it.users = dto.users;
    return it;
  }

  public static fromEntity(entity: Game) {
    return this.from({
      id: entity.id,
      users: entity.users,
    });
  }

  public toEntity() {
    const it = new Game();
    it.id = this.id;
    it.users = this.users;
    it.createDateTime = new Date();
    return it;
  }
}
