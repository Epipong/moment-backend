import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { STRONG_PASSWORD_RULE } from 'src/rules/password.rule';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    required: true,
  })
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'This is an optional property',
    required: false,
  })
  @IsOptional()
  role?: Role;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    required: true,
  })
  @IsStrongPassword(STRONG_PASSWORD_RULE)
  password: string;
}
