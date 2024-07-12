import { User } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  protected getEntity(): string {
    return 'user';
  }
}
