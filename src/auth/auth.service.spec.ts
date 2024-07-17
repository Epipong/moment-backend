import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { user } from 'src/fixtures/users';
import { UsersRepository } from 'src/repositories/users.repository';
import { LoginDto, RegisterDto } from './dto/credential.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { User } from '@prisma/client';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const usersModuleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        PrismaService,
        UsersService,
        UsersRepository,
        JwtService,
      ],
      imports: [PrismaModule],
      exports: [AuthService],
    }).compile();
    usersService = usersModuleRef.get<UsersService>(UsersService);
    authService = usersModuleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should register a new user', async () => {
    const newUser: RegisterDto = {
      ...user,
      repeatPassword: user.password,
    };
    jest.spyOn(usersService, 'create').mockImplementation(async () => ({
      ...user,
      password: '$2b$10$9YOibayXk/O8as6Tk1HsVOFE5706mulVBY2yMSumZU0lox73sXpv6',
    }));
    const userRegistered = await authService.register(newUser);
    expect(userRegistered.username).toBe(user.username);
    expect(userRegistered.password).not.toBe(user.password);
  });

  it('should not register a new user', async () => {
    const newUser: RegisterDto = {
      ...user,
      repeatPassword: '123',
    };
    expect(async () => {
      await authService.register(newUser);
    }).rejects.toThrow(BadRequestException);
  });

  it('should login a user by username', async () => {
    const result: User[] = [
      {
        id: 1,
        username: 'john.doe',
        email: 'john.doe@moment.com',
        password:
          '$2b$10$9YOibayXk/O8as6Tk1HsVOFE5706mulVBY2yMSumZU0lox73sXpv6',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    jest.spyOn(usersService, 'findAll').mockImplementation(async () => result);
    const { access_token } = await authService.login({
      username: 'john.doe',
      password: '@123Password',
    });
    expect(access_token.length).toBeGreaterThan(0);
  });

  it('should login a user by email', async () => {
    const result: User[] = [
      {
        id: 1,
        username: 'john.doe',
        email: 'john.doe@moment.com',
        password:
          '$2b$10$9YOibayXk/O8as6Tk1HsVOFE5706mulVBY2yMSumZU0lox73sXpv6',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    jest.spyOn(usersService, 'findAll').mockImplementation(async () => result);
    const { access_token } = await authService.login({
      email: 'john.doe@moment.com',
      password: '@123Password',
    });
    expect(access_token.length).toBeGreaterThan(0);
  });

  it('should throw an exception if username or email are emptied', async () => {
    const credential: LoginDto = {
      password: '@123Password',
    };
    expect(async () => {
      await authService.login(credential);
    }).rejects.toThrow(BadRequestException);
  });
});
