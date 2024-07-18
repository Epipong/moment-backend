import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from './users.service';
import { UsersRepository } from 'src/repositories/users.repository';
import { JwtService } from '@nestjs/jwt';
import { user, users } from 'src/fixtures/users';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const usersModuleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService, UsersRepository, JwtService],
      imports: [PrismaModule],
      exports: [UsersService],
    })
      .overrideProvider(PrismaService)
      .useValue(null)
      .compile();
    usersController = usersModuleRef.get(UsersController);
    usersService = usersModuleRef.get(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('Create User', () => {
    beforeEach(() => {
      jest.spyOn(usersService, 'create').mockImplementation(async () => user);
    });

    it('should not get the password after user created', async () => {
      const { username, email, password } = user;
      const createdUser = await usersController.create({
        username,
        email,
        password,
      });
      expect(createdUser.password).toBeFalsy();
    });
  });

  describe('Update User', () => {
    beforeEach(() => {
      jest.spyOn(usersService, 'update').mockImplementation(async () => ({
        ...user,
        username: 'davy.tran',
      }));
    });

    it('should update user by id', async () => {
      const createdUser = await usersController.update(String(user.id), {
        username: 'davy.tran',
      });
      expect(createdUser.username).toEqual('davy.tran');
      expect(createdUser.password).toBeFalsy();
    });
  });

  describe('Delete USer By Id', () => {
    beforeEach(() => {
      jest.spyOn(usersService, 'remove').mockImplementation(async () => user);
    });

    it('should delete user by id', async () => {
      const deletedUser = await usersController.remove(String(user.id));
      expect(deletedUser.password).toBeFalsy();
    });
  });

  describe('Get Users', () => {
    beforeEach(() => {
      jest.spyOn(usersService, 'findAll').mockImplementation(async () => users);
    });

    it('should read all users', async () => {
      const allUsers = await usersController.findAll();
      expect(allUsers.length).toEqual(users.length);
      expect(allUsers[0].password).toBeFalsy();
    });
  });

  describe('Get User By Id', () => {
    beforeEach(() => {
      jest.spyOn(usersService, 'findOne').mockImplementation(async () => ({
        id: 0,
        username: 'john.doe',
        email: 'john.doe@email.com',
        role: 'USER',
        password: '@123Password',
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    });

    it('should read user by id', async () => {
      const foundUser = await usersController.findOne(String(user.id));
      expect(foundUser.username).toEqual('john.doe');
      expect(foundUser.password).toBeFalsy();
    });
  });
});
