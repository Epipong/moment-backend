import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AuthService, UsersService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/register')
      .expect(200)
      .expect('Hello World!');
  });
});
