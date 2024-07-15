import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/credential.dto';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from 'src/users/entities/user.entity';
import { AccessTokenEntity } from './entities/access-token.entity';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    type: UserEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('register')
  async register(@Body() credential: RegisterDto): Promise<UserEntity> {
    const user = await this.authService.register(credential);
    return plainToInstance(UserEntity, user);
  }

  @ApiOkResponse({
    type: AccessTokenEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('login')
  async login(@Body() credential: LoginDto) {
    return this.authService.login(credential);
  }
}
