import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';
import { UsersRepository } from 'src/repositories/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { user } from 'src/fixtures/users';

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

  it('should create a new user', async () => {
    const newUser: CreateUserDto = {
      ...user,
    };
    const createdUser = await usersService.create(newUser);
    expect(JSON.stringify(createdUser)).toBe(JSON.stringify(user));
  });
});
