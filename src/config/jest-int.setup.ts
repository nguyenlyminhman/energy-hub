import { config } from 'dotenv';
config({ path: '.env.test' });

import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';

jest.setTimeout(30000);

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

export { prisma };
