import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from 'src/repositories/users.repository';
import { Options } from 'src/repositories/base.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepertory: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepertory.create({ data: createUserDto });
  }

  async findAll(options?: Options) {
    return this.usersRepertory.findMany(options);
  }

  async findOne(id: number) {
    return this.usersRepertory.findOne(+id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
