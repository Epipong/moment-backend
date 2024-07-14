import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true, nullable: false })
  username: string;

  @ApiProperty({ required: true, nullable: false })
  email: string;

  @Exclude()
  @ApiProperty({ required: true, nullable: false })
  password: string;

  @ApiProperty()
  role: Role;

  @ApiProperty({ required: false })
  createdAt: Date;

  @ApiProperty({ required: false })
  updatedAt: Date;
}
