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
import { ResponseUser } from './dto/response-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(['ADMIN'])
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUser> {
    return this.usersService.create(createUserDto);
  }

  @Roles(['ADMIN'])
  @Get()
  async findAll(): Promise<ResponseUser[]> {
    return this.usersService.findAll();
  }

  @Roles(['ADMIN', 'USER'])
  @Get(':user_id')
  async findOne(@Param('user_id') id: string): Promise<ResponseUser> {
    return this.usersService.findOne(+id);
  }

  @Roles(['ADMIN', 'USER'])
  @Patch(':user_id')
  async update(
    @Param('user_id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseUser> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Roles(['ADMIN', 'USER'])
  @Delete(':user_id')
  async remove(@Param('user_id') id: string): Promise<ResponseUser> {
    return this.usersService.remove(+id);
  }
}
