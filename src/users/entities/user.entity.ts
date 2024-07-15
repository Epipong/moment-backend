import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
    required: true,
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    required: true,
    nullable: false,
    minimum: 4,
    maximum: 24,
  })
  username: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    required: true,
    nullable: false,
  })
  email: string;

  @Exclude()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    required: true,
    nullable: false,
    minimum: 8,
  })
  password: string;

  @ApiProperty({
    type: Role,
    description: 'This is an optional property',
    required: true,
  })
  role: Role;

  @ApiProperty({
    type: Date,
    description: 'This is an optional property',
    required: false,
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'This is an optional property',
    required: false,
  })
  updatedAt: Date;
}
