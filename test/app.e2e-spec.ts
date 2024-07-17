import { Test, TestingModule } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from 'src/app.module';
import { users } from 'src/fixtures/users';
import { UsersService } from 'src/users/users.service';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;
  const usersService = { findAll: () => users };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('/users (GET)', () => {
    return app
      .inject({
        method: 'GET',
        url: '/users',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.payload).toEqual('');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
