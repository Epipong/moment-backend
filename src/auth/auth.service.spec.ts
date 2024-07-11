import { AuthService } from './auth.service';
import { user } from 'src/fixtures/users';
import { PrismaService } from 'src/prisma/prisma.service';

describe('AuthService', () => {
  const prisma: PrismaService = global.prisma;
  let authService: AuthService;

  beforeEach(async () => {
    authService = new AuthService(prisma);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('Credentials - Basic', async () => {
    it('should register a new user', async () => {
      const userRegistered = await authService.register(user);
      expect(userRegistered).toBeDefined();
    });

    // it('should login a user and return the access token', async () => {
    //   const { access_token } = await service.login(user);
    //   expect(access_token).toBeInstanceOf(String);
    //   expect(access_token.length).toBeGreaterThan(0);
    // });
  });
});
