import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';
import { UsersRepository } from 'src/repositories/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { user } from 'src/fixtures/users';

describe('UsersService', () => {
  let usersService: UsersService;
  const prisma: PrismaService = global.prisma;

  beforeEach(async () => {
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

  it('should find an existing user', async () => {
    await prisma.user.create({ data: user });
    const foundUser = await usersService.findOne(user.id);
    expect(JSON.stringify(foundUser)).toBe(JSON.stringify(user));
  });

  it('should not find an unexisting user', async () => {
    const foundUser = await usersService.findOne(user.id);
    expect(foundUser).toBeFalsy();
  });

  it('should update the username', async () => {
    await prisma.user.create({ data: user });
    const updatedUser = await usersService.update(user.id, {
      username: 'davy.tran@moment.com',
    });
    expect(updatedUser.username).toBe('davy.tran@moment.com');
  });

  it('should remove a user', async () => {
    await prisma.user.create({ data: user });
    await usersService.remove(user.id);
    const userNotFound = await prisma.user.findUnique({
      where: { id: user.id },
    });
    expect(userNotFound).toBeFalsy();
  });
});
