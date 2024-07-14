import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { User } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private checkIfUserAuthorized(id: number, user: User) {
    if (user.role === 'USER' && user.id !== id) {
      throw new ForbiddenException('Forbidden resource');
    }
  }

  @Roles(['ADMIN'])
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(['ADMIN'])
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Roles(['ADMIN', 'USER'])
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() request: { user: User }) {
    this.checkIfUserAuthorized(+id, request.user);
    return this.usersService.findOne(+id);
  }

  @Roles(['ADMIN', 'USER'])
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() request,
  ) {
    this.checkIfUserAuthorized(+id, request);
    return this.usersService.update(+id, updateUserDto);
  }

  @Roles(['ADMIN', 'USER'])
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() request: { user: User }) {
    this.checkIfUserAuthorized(+id, request.user);
    return this.usersService.remove(+id);
  }
}
