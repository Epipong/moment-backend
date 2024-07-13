import { IsAlphanumeric, IsStrongPassword } from 'class-validator';
import { STRONG_PASSWORD_RULE } from 'src/rules/password.rule';

export class LoginDto {
  @IsAlphanumeric()
  username: string;

  @IsStrongPassword(STRONG_PASSWORD_RULE)
  password: string;
}

export class RegisterDto extends LoginDto {
  @IsStrongPassword(STRONG_PASSWORD_RULE)
  repeatPassword: string;
}
