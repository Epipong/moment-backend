import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';
import { UsersRepository } from 'src/repositories/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { User } from '@prisma/client';
import { user, users } from 'src/fixtures/users';

describe('UsersService', () => {
  let usersRepository: UsersRepository;
  let usersService: UsersService;

  beforeEach(async () => {
    const usersModuleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService, UsersRepository, JwtService],
      imports: [PrismaModule],
      exports: [UsersService],
    })
      .overrideProvider(PrismaService)
      .useValue(null)
      .compile();

    usersRepository = usersModuleRef.get(UsersRepository);
    usersService = usersModuleRef.get(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should create a new user', async () => {
    const newUser: CreateUserDto = {
      email: 'john.doe@moment.com',
      username: 'john.doe',
      password: '@123Password',
    };
    const result: User = {
      id: 1,
      username: 'john.doe',
      email: 'john.doe@moment.com',
      password: '$2b$10$9YOibayXk/O8as6Tk1HsVOFE5706mulVBY2yMSumZU0lox73sXpv6',
      role: 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest
      .spyOn(usersRepository, 'create')
      .mockImplementation(async () => result);
    const createdUser = await usersService.create(newUser);
    expect(createdUser.email).toBe('john.doe@moment.com');
    expect(createdUser.username).toBe('john.doe');
    expect(createdUser.password).toBe(
      '$2b$10$9YOibayXk/O8as6Tk1HsVOFE5706mulVBY2yMSumZU0lox73sXpv6',
    );
  });

  it('should read all users', async () => {
    jest
      .spyOn(usersRepository, 'findMany')
      .mockImplementation(async () => users);
    const allUsers = await usersService.findAll();
    expect(allUsers.length).toBe(2);
  });

  it('should find an existing user', async () => {
    jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => user);
    const foundUser = await usersService.findOne(user.id);
    expect(JSON.stringify(foundUser)).toBe(JSON.stringify(user));
  });

  it('should not find an unexisting user', async () => {
    jest
      .spyOn(usersRepository, 'findOne')
      .mockImplementation(async () => undefined);
    const foundUser = await usersService.findOne(user.id);
    expect(foundUser).toBeFalsy();
  });

  it('should update the username', async () => {
    jest.spyOn(usersRepository, 'update').mockImplementation(async () => ({
      ...user,
      username: 'davy.tran',
    }));
    const updatedUser = await usersService.update(user.id, {
      username: 'davy.tran',
    });
    expect(updatedUser.username).toBe('davy.tran');
  });

  it('should remove a user', async () => {
    jest.spyOn(usersRepository, 'delete').mockImplementation(async () => user);
    const deletedUser = await usersService.remove(user.id);
    expect(JSON.stringify(deletedUser)).toBe(JSON.stringify(user));
  });
});
