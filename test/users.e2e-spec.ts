import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { UsersService } from '../src/users/services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users } from '../src/users/models/users.model';
import { plainToClass } from 'class-transformer';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const usersService: Partial<UsersService> = {
    create: async () => [
      {
        _id: '1',
        username: 'username01',
        password: 'password',
        fullname: 'fullname',
        dateOfBirth: '01/01/2021',
        gender: 'gender',
      },
    ],

    findAll: async () =>
      [
        {
          _id: '1',
          username: 'username01',
          password: 'password',
          fullname: 'fullname',
          dateOfBirth: '01/01/2021',
          gender: 'gender',
        },
        {
          _id: '2',
          username: 'username02',
          password: 'password',
          fullname: 'fullname',
          dateOfBirth: '01/01/2021',
          gender: 'gender',
        },
      ] as Users[],

    findOne: async () => {
      return {
        _id: '1',
        username: 'username01',
        password: 'password',
        fullname: 'fullname',
        dateOfBirth: '01/01/2021',
        gender: 'gender',
      } as Users & { _id: any };
    },

    update: async () => {
      return {
        _id: '1',
        username: 'username01',
        password: 'password',
        fullname: 'fullname',
        dateOfBirth: '01/01/2021',
        gender: 'gender',
      } as Users & { _id: any };
    },

    remove: async () => [
      {
        _id: '1',
        username: 'username01',
        password: 'password',
        fullname: 'fullname',
        dateOfBirth: '01/01/2021',
        gender: 'gender',
      },
    ],

    findByLogin: async () => {
      return {
        username: 'HaiDuong',
        email: 'haiduong@gmail.com',
        password: '12345',
      } as Users & { _id: any };
    },

    findByEmail: async () => {
      return {} as Users;
    },
  };

  const userList: Array<Partial<Users & Document>> = [
    {
      _id: '1',
      username: 'aaa',
      password: '12345',
      fullname: 'hai duong',
      dateOfBirth: 'String',
      gender: 'nam',
      email: 'haiduong@gmail.com',
    },
    {
      id: '2',
      username: 'username02',
      password: 'password',
      fullname: 'fullname',
      dateOfBirth: '01/01/2021',
      gender: 'gender',
    },
  ];

  const user = {
    username: 'HaiDuong',
    email: 'haiduong@gmail.com',
    password: '12345',
  };

  // tao module gia
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017', { dbName: 'test' }),
        UsersModule,
      ],
      //   controllers: [UsersController],
      //   providers: [UsersService, UsersRepository],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a new user (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(userList[0])
      .expect(201);
    // .then((res) => {
    //   expect(res.body._id).toBeDefined();
    // });
  });

  it('/users (GET)', async () => {
    return request(app.getHttpServer()).get('/users').expect(200);
    // .then((res) => {
    //   expect(res.body.length).toBe(2);
    // });
  });

  it('/users/:id (GET)', async () => {
    return request(app.getHttpServer()).get('/users/:id').expect(200);
    // .then((res) => {
    //   expect(res.body.length).toBe(1);
    // });
  });

  it('/users/:id (PATCH)', async () => {
    return request(app.getHttpServer())
      .patch('/users/:id')
      .send(userList[0])
      .expect(200);
  });

  it('/users/:id (DELETE)', async () => {
    return request(app.getHttpServer()).delete('/users/:id').expect(200);
  });

  it('/auth/login (POST)', async () => {
    return request(app.getHttpServer())
      .post('/auth/login2')
      .send({ emai: user.email, password: user.password })
      .expect(201)
      .then((res) => {
        expect(res.body.accessToken).toBeDefined();
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
