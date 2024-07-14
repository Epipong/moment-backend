import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { UserEntity } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(['ADMIN'])
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.usersService.create(createUserDto);
    return plainToInstance(UserEntity, user);
  }

  @Roles(['ADMIN'])
  @Get()
  async findAll(): Promise<UserEntity[]> {
    const users = await this.usersService.findAll();
    return plainToInstance(UserEntity, users);
  }

  @Roles(['ADMIN', 'USER'])
  @Get(':user_id')
  async findOne(@Param('user_id') id: string): Promise<UserEntity> {
    const user = await this.usersService.findOne(+id);
    return plainToInstance(UserEntity, user);
  }

  @Roles(['ADMIN', 'USER'])
  @Patch(':user_id')
  async update(
    @Param('user_id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.usersService.update(+id, updateUserDto);
    return plainToInstance(UserEntity, user);
  }

  @Roles(['ADMIN', 'USER'])
  @Delete(':user_id')
  async remove(@Param('user_id') id: string): Promise<UserEntity> {
    const user = await this.usersService.remove(+id);
    return plainToInstance(UserEntity, user);
  }
}
