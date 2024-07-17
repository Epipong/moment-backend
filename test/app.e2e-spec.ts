import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from 'src/app.module';
import { user, users } from 'src/fixtures/users';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;
  const usersService = {
    findAll: () => users,
    create: () => ({
      ...user,
      password: '$2b$10$9YOibayXk/O8as6Tk1HsVOFE5706mulVBY2yMSumZU0lox73sXpv6',
    }),
  };
  const authService = { register: () => user };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard).useValue(true)
      .overrideProvider(UsersService).useValue(usersService)
      .overrideProvider(AuthService).useValue(authService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('POST: register', () => {
    beforeEach(() => {
      jest.spyOn(authService, 'register');
      jest.spyOn(usersService, 'create');
    });

    it('should register a new user', async () => {
      await request(app.getHttpServer()).post('/auth/register').expect(201);
    });
  });

  describe('GET: findAll', () => {
    beforeEach(() => {
      jest.spyOn(usersService, 'findAll');
    });

    it('should read all users', async () => {
      await request(app.getHttpServer()).get('/users').expect(200);
    });
  })

  afterAll(async () => {
    await app.close();
  });
});
