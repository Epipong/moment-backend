import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    type: String,
    description: 'This is an optional property',
    required: false,
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    type: String,
    description: 'This is an optional property',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    required: true,
  })
  @IsString()
  password: string;
}

export class RegisterDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    required: true,
    minimum: 4,
    maximum: 24,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(24)
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
    description: 'This is a required property',
    required: true,
  })
  @IsStrongPassword(STRONG_PASSWORD_RULE)
  password: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    required: true,
  })
  @IsStrongPassword(STRONG_PASSWORD_RULE)
  repeatPassword: string;
}
