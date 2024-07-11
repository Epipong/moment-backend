import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { user } from 'src/fixtures/users';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Credentials - Basic', async () => {
    it('should register a new user', async () => {
      const { username, password } = user;
      const user = await service.register(username, password);
      expect(user).toBeDefined();
    });

    it('should login a user and return the access token', async () => {
      const { access_token } = await service.login(user);
      expect(access_token).toBeInstanceOf(String);
      expect(access_token.length).toBeGreaterThan(0);
    });
  });
});
