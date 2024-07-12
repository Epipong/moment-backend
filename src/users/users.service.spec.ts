import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';
import { UsersRepository } from 'src/repositories/users.repository';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const prisma: PrismaService = global.prisma;
    const usersRepository = new UsersRepository(prisma);
    usersService = new UsersService(usersRepository);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });
});
