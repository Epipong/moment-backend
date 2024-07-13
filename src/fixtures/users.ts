import { User } from '@prisma/client';

const user: Readonly<User> = {
  id: 0,
  username: 'john.doe',
  email: 'john.doe@moment.com',
  password: '@123Abcdef',
  role: 'USER',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

export { user };
