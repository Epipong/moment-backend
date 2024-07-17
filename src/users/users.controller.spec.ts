import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from './users.service';
import { UsersRepository } from 'src/repositories/users.repository';
import { JwtService } from '@nestjs/jwt';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const usersModuleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService, UsersRepository, JwtService],
      imports: [PrismaModule],
      exports: [UsersService],
    }).compile();
    usersController = usersModuleRef.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });
});
