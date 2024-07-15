import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/credential.dto';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from 'src/users/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() credential: RegisterDto): Promise<UserEntity> {
    const user = await this.authService.register(credential);
    return plainToInstance(UserEntity, user);
  }

  @Post('login')
  async login(@Body() credential: LoginDto) {
    return this.authService.login(credential);
  }
}
