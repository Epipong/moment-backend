import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { user } from 'src/fixtures/users';
import { UsersRepository } from 'src/repositories/users.repository';
import { CredentialDto } from './dto/credential.dto';
import { PrismaService } from 'src/prisma/prisma.service';

describe('AuthService', () => {
  let authService: AuthService;
  const prisma: PrismaService = global.prisma;

  beforeEach(async () => {
    const usersRepertory = new UsersRepository(prisma);
    const usersService = new UsersService(usersRepertory);
    authService = new AuthService(usersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('Credentials - Basic', async () => {
    it('should register a new user', async () => {
      const newUser: CredentialDto = {
        ...user,
        repeatPassword: user.password,
      };
      const userRegistered = await authService.register(newUser);
      expect(userRegistered).toBeDefined();
    });

    // it('should login a user and return the access token', async () => {
    //   const { access_token } = await authService.login(user);
    //   expect(access_token).toBeInstanceOf(String);
    //   expect(access_token.length).toBeGreaterThan(0);
    // });
  });
});
