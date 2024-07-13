import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { STRONG_PASSWORD_RULE } from 'src/rules/password.rule';

export class LoginDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  password: string;
}

export class RegisterDto {
  @IsString()
  @MinLength(4)
  @MaxLength(24)
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword(STRONG_PASSWORD_RULE)
  password: string;

  @IsStrongPassword(STRONG_PASSWORD_RULE)
  repeatPassword: string;
}
