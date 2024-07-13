import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export type Options = {
  where?: { [key: string]: unknown };
  limit?: number;
  offset?: number;
  include?: { [key: string]: unknown };
  orderBy?: unknown;
  cursor?: unknown;
  select?: unknown;
};

@Injectable()
export abstract class BaseRepository<T> {
  constructor(protected prisma?: PrismaService) {}

  async create(data: unknown): Promise<T> {
    return await this.prisma[this.getEntity()].create(data);
  }

  async findMany(options: Options): Promise<T[]> {
    const params = {
      where: options.where,
      take: options.limit,
      skip: options.offset,
      include: options.include,
      orderBy: options.orderBy,
      cursor: options.cursor,
      select: options.select,
    };
    return this.prisma[this.getEntity()].findMany(params);
  }

  protected abstract getEntity(): string;
}
