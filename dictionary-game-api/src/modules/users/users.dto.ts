import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { User } from '../../model/user.entity';
export class UserDTO implements Readonly<UserDTO> {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  password: string;

  public static from(dto: Partial<UserDTO>) {
    const it = new UserDTO();
    it.id = dto.id;
    it.name = dto.name;
    it.email = dto.email;
    it.password = dto.password;
    return it;
  }

  public static fromEntity(entity: User) {
    return this.from({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
    });
  }

  public toEntity() {
    const it = new User();
    it.id = this.id;
    it.name = this.name;
    it.email = this.email;
    it.password = this.password;
    it.createDateTime = new Date();
    return it;
  }
}
