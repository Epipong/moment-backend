import { Role } from '@prisma/client';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { STRONG_PASSWORD_RULE } from 'src/rules/password.rule';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  role?: Role;

  @IsStrongPassword(STRONG_PASSWORD_RULE)
  password: string;
}
