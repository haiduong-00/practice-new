import { Document } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { Users } from '../models/users.model';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  //   let usersRepository: UsersRepository<User>;
  let usersService: UsersService;

  const userList: Array<Partial<Users & Document>> = [
    {
      _id: '1',
      username: 'username01',
      password: 'password',
      fullname: 'fullname',
      dateOfBirth: '01/01/2021',
      gender: 'gender',
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

  beforeEach(async () => {
    usersService = new UsersService(null);

    controller = new UsersController(usersService);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a account', async () => {
      jest
        .spyOn(usersService, 'create')
        .mockImplementation(async () => userList[0]);
      expect(await controller.create(userList[0] as CreateUserDto)).toEqual(
        userList[0],
      );
    });
  });

  describe('findOne', () => {
    test('should find a account', async () => {
      jest
        .spyOn(usersService, 'findOne')
        .mockImplementation(async (id: string) => {
          const res = userList.find((user) => user._id === id);
          return res as any;
        });
      for (let i = 0; i <= 1; i++) {
        const res = await controller.findOne(userList[i]._id);
        expect(res).toBe(userList[i]);
      }
    });
  });

  describe('findAll', () => {
    test('should find all account', async () => {
      jest
        .spyOn(usersService, 'findAll')
        .mockImplementation(async () => userList as any);
      expect(await controller.findAll()).toEqual(userList);
    });
  });
});
