import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() credential: RegisterDto) {
    return this.authService.register(credential);
  }

  @Post('login')
  async login(@Body() credential: LoginDto) {
    return this.authService.login(credential);
  }
}
