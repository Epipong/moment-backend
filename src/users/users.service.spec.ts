import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    usersService = new UsersService();
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });
});
