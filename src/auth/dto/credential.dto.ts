import { IsAlphanumeric, IsStrongPassword } from 'class-validator';
import { STRONG_PASSWORD_RULE } from 'src/rules/password';

export class CredentialDto {
  @IsAlphanumeric()
  username: string;

  @IsStrongPassword(STRONG_PASSWORD_RULE)
  password: string;

  @IsStrongPassword(STRONG_PASSWORD_RULE)
  repeatPassword: string;
}
