import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { user } from 'src/fixtures/users';
import { UsersRepository } from 'src/repositories/users.repository';
import { LoginDto, RegisterDto } from './dto/credential.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { hashPassword } from 'src/utils/password';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  const prisma: PrismaService = global.prisma;

  beforeEach(async () => {
    const usersRepertory = new UsersRepository(prisma);
    const usersService = new UsersService(usersRepertory);
    const jwtService = new JwtService();
    authService = new AuthService(usersService, jwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should register a new user', async () => {
    const newUser: RegisterDto = {
      ...user,
      repeatPassword: user.password,
    };
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

  it('should login a user and return the access token', async () => {
    const credential: LoginDto = {
      username: 'john.doe',
      email: 'john.doe@moment.com',
      password: '@1234Password',
    };
    const hashedPassword = await hashPassword(credential.password);
    await prisma.user.create({
      data: {
        username: credential.username,
        password: hashedPassword,
        email: credential.email,
      },
    });
    const { access_token } = await authService.login(credential);
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
