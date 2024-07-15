import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from 'src/repositories/users.repository';
import { Options } from 'src/repositories/base.repository';
import { hashPassword } from 'src/utils/password';

@Injectable()
export class UsersService {
  constructor(private usersRepertory: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await hashPassword(createUserDto.password);
    return this.usersRepertory.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  async findAll(options: Options = {}) {
    return this.usersRepertory.findMany(options);
  }

  async findOne(id: number) {
    return this.usersRepertory.findOne(+id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const hashedPassword = updateUserDto.password
      ? await hashPassword(updateUserDto.password)
      : undefined;
    return this.usersRepertory.update(+id, {
      ...updateUserDto,
      password: hashedPassword,
    });
  }

  async remove(id: number) {
    return this.usersRepertory.delete(+id);
  }
}
