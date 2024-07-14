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

  async findMany(options: Options = {}): Promise<T[]> {
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

  async findOne(id: number): Promise<T | undefined> {
    return this.prisma[this.getEntity()].findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<T>): Promise<T | undefined> {
    return this.prisma[this.getEntity()].update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<T | undefined> {
    return this.prisma[this.getEntity()].delete({ where: { id } });
  }

  protected abstract getEntity(): string;
}
