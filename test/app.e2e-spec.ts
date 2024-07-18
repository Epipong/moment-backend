import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from 'src/app.module';
import { user, users } from 'src/fixtures/users';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from 'src/users/entities/user.entity';
import { plainToInstance } from 'class-transformer';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;
  const usersService = {
    findAll: () => users,
    create: () => ({
      ...user,
      password: '$2b$10$9YOibayXk/O8as6Tk1HsVOFE5706mulVBY2yMSumZU0lox73sXpv6',
    }),
    findOne: () => user,
    update: () => ({ ...user, username: 'davy.tran' }),
    remove: () => jest.fn(),
  };
  const authService = {
    register: () => user,
    login: () => ({ access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' }),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(true)
      .overrideProvider(UsersService)
      .useValue(usersService)
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('Authentification', () => {
    describe('POST: /auth/register', () => {
      beforeEach(() => {
        jest.spyOn(authService, 'register');
        jest.spyOn(usersService, 'create');
      });

      it('should register a new user', async () => {
        const createdUser: UserEntity = plainToInstance(UserEntity, user);
        await request(app.getHttpServer())
          .post('/auth/register')
          .expect(201)
          .expect(JSON.stringify(createdUser));
      });
    });

    describe('POST: /auth/login', () => {
      beforeEach(() => {
        jest.spyOn(authService, 'login');
        jest.spyOn(usersService, 'findAll');
      });

      it('should log in the user', async () => {
        const accessToken = {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        };
        await request(app.getHttpServer())
          .post('/auth/login')
          .expect(201)
          .expect(JSON.stringify(accessToken));
      });
    });
  });

  describe('Users', () => {
    describe('POST: /users', () => {
      beforeEach(() => {
        jest.spyOn(usersService, 'create');
      });

      it('should create a new user', async () => {
        const createdUser: UserEntity = plainToInstance(UserEntity, user);
        await request(app.getHttpServer())
          .post('/users')
          .expect(201)
          .expect(JSON.stringify(createdUser));
      });
    });

    describe('PATCH: /users/:id', () => {
      beforeEach(() => {
        jest.spyOn(usersService, 'create');
      });

      it('should update user by id', async () => {
        const updatedUser: UserEntity = plainToInstance(UserEntity, {
          ...user,
          username: 'davy.tran',
        });
        await request(app.getHttpServer())
          .patch(`/users/${user.id}`)
          .expect(200)
          .expect(JSON.stringify(updatedUser));
      });
    });

    describe('DELETE: /users/:id', () => {
      beforeEach(() => {
        jest.spyOn(usersService, 'remove');
      });

      it('should delete user by id', async () => {
        await request(app.getHttpServer())
          .delete(`/users/${user.id}`)
          .expect(200);
      });
    });

    describe('GET: /users', () => {
      beforeEach(() => {
        jest.spyOn(usersService, 'findAll');
      });

      it('should read all users', async () => {
        const allUsers: UserEntity[] = plainToInstance(UserEntity, users);
        await request(app.getHttpServer())
          .get('/users')
          .expect(200)
          .expect(JSON.stringify(allUsers));
      });
    });

    describe('GET: /users/:id', () => {
      beforeEach(() => {
        jest.spyOn(usersService, 'findOne');
      });

      it('should read user by id', async () => {
        const foundUser: UserEntity = plainToInstance(UserEntity, user);
        await request(app.getHttpServer())
          .get(`/users/${user.id}`)
          .expect(200)
          .expect(JSON.stringify(foundUser));
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
