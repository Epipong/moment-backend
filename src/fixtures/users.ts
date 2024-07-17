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

const users: User[] = [
  {
    id: 1,
    username: 'john.doe',
    email: 'john.doe@moment.com',
    password: '@123Password',
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    username: 'john.martin',
    email: 'john.martin@moment.com',
    password: '@321Password',
    role: 'ADMIN',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export { user, users };
