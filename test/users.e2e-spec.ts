import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { randomUUID } from 'crypto';

describe('Users E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    // 🔥 QUAN TRỌNG
    app.setGlobalPrefix('api/v1/');

    await app.init();

    prisma = app.get(PrismaService);
  });

  afterEach(async () => {
    // await prisma.users.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });


  it('should be defined', () => {
    expect(true).toBe(true);
  });

  it('POST /api/v1/user/create - success', async () => {
    const payload = {
      username: 'john',
      password: 'password123',
      fullname: 'John Doe',
      avatar: 'avatar.png',
    };

    const res = await request(app.getHttpServer())
      .post('/api/v1/user/create?lang=vi')
      .send(payload)
      .expect(200);

    // // ===== response wrapper =====
    // expect(res.body).toHaveProperty('data');
    // expect(res.body).toHaveProperty('message');
    // expect(res.body).toHaveProperty('statusCode');

    // // ===== business assert =====
    // expect(res.body.data.username).toBe('john');
    // expect(res.body.data.id).toBeDefined();

    // // ===== i18n =====
    // expect(res.body.message).toContain('thành công'); // tuỳ file vi.json

    // // ===== status in body =====
    // expect(res.body.statusCode).toBe(202);
  });

  // it('/POST /api/users (duplicate username)', async () => {
  //   await prisma.users.create({
  //     data: {
  //       id: randomUUID(),
  //       username: 'john',
  //       password: 'hashed',
  //       fullname: 'John',
  //       created_at: new Date(),
  //     },
  //   });

  //   const res = await request(app.getHttpServer())
  //     .post('/api/users')
  //     .send({
  //       username: 'john',
  //       password: 'password123',
  //       fullname: 'John',
  //     })
  //     .expect(409);

  //   expect(res.body.message).toContain('Username');
  // });

  // it('/GET /api/users (pagination)', async () => {
  //   await prisma.users.createMany({
  //     data: [
  //       {
  //         id: randomUUID(),
  //         username: 'u1',
  //         password: 'p1',
  //         fullname: 'U1',
  //         created_at: new Date(),
  //       },
  //       {
  //         id: randomUUID(),
  //         username: 'u2',
  //         password: 'p2',
  //         fullname: 'U2',
  //         created_at: new Date(),
  //       },
  //     ],
  //   });

  //   const res = await request(app.getHttpServer())
  //     .get('/api/users?page=1&pageSize=10')
  //     .expect(200);

  //   expect(res.body.data.length).toBe(2);
  //   expect(res.body.meta.totalPage).toBe(1);
  // });
});
