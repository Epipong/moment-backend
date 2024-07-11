import { User } from '@prisma/client';
import { BaseRepository } from './base.repository';

export class UsersRepository extends BaseRepository<User> {
  protected getEntity(): string {
    return 'user';
  }
}
