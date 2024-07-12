import { PrismaClient, Prisma } from '@prisma/client';
import { config } from 'dotenv';

config({ path: '.env.test' });

const prisma = new PrismaClient();

async function setTablesNameInCache(dataSource) {
  if (!process.env.TABLES_NAME) {
    const ALL_TABLES_QUERY = `SELECT "table_name"
    FROM information_schema.tables
    WHERE "table_schema" = 'public'
      AND "table_type" = 'BASE TABLE'
      and "table_name" not in ('_prisma_migrations');`;

    const tableNamesQueryResult =
      await dataSource.$queryRaw`${Prisma.raw(ALL_TABLES_QUERY)}`;

    const tableNames = tableNamesQueryResult.map(
      ({ table_name }) => table_name,
    );

    process.env.TABLES_NAME = JSON.stringify(tableNames);
  }
}

beforeAll(async () => {
  prisma.$connect();
  await setTablesNameInCache(prisma);
});

beforeEach(async () => {
  if (!process.env.TABLES_NAME || process.env.TABLES_NAME.length === 0) {
    throw new Error('db set up could not be done');
  }

  const allTablesNameResultQuery = JSON.parse(process.env.TABLES_NAME);

  const truncateQuery = `TRUNCATE TABLE ${allTablesNameResultQuery
    .map((tableName) => `"${tableName}"`)
    .join(', ')} CASCADE;`;

  await prisma.$queryRaw`${Prisma.raw(truncateQuery)}`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

global.prisma = prisma;
