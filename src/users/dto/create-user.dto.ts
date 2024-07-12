import { IsString, IsStrongPassword } from 'class-validator';
import { STRONG_PASSWORD_RULE } from 'src/rules/password';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsStrongPassword(STRONG_PASSWORD_RULE)
  password: string;
}
