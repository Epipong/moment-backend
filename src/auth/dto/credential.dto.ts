import { IsAlphanumeric, IsEmail, IsStrongPassword } from 'class-validator';
import { STRONG_PASSWORD_RULE } from 'src/rules/password.rule';

export class LoginDto {
  @IsAlphanumeric()
  username?: string;

  @IsEmail()
  email?: string;

  @IsStrongPassword(STRONG_PASSWORD_RULE)
  password: string;
}

export class RegisterDto extends LoginDto {
  @IsStrongPassword(STRONG_PASSWORD_RULE)
  repeatPassword: string;
}
