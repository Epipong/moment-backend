import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export abstract class BaseRepository<T> {
  constructor(protected prisma?: PrismaService) {}

  async create(data: unknown): Promise<T> {
    return await this.prisma[this.getEntity()].create(data);
  }

  protected abstract getEntity(): string;
}
