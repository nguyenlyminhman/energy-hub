import * as dotenv from 'dotenv';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';

dotenv.config({
    path: path.resolve(process.cwd(), '.env.test'),
});

const prisma = new PrismaClient();

beforeAll(async () => {
    // Cleanup data
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE
      "users",
      "customer"
    RESTART IDENTITY CASCADE
  `);
});

afterAll(async () => {
    await prisma.$disconnect();
});
