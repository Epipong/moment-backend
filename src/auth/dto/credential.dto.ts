import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsStrongPassword } from 'class-validator';

export class CredentialDto {
  @ApiProperty({ required: true, nullable: false })
  @IsAlphanumeric()
  username: string;

  @ApiProperty({ required: true, nullable: false })
  @IsStrongPassword()
  password: string;
}
