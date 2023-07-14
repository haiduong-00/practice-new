// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { UserRepository } from 'src/user/repositories/user.repository';
// import { UserService } from 'src/user/services/user.service';
// import { UserModule } from 'src/user/user.module';
// import { User } from '../entities/user.entity';
// import { UsersService } from './users.service';

// describe('UsersService', () => {
//   let usersService: UsersService;

//   const mockUsersrepository = {};

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UsersService,
//         {
//           provide: getRepositoryToken(User),
//           useValue: mockUsersrepository,
//         },
//       ],
//     }).compile();

//     usersService = module.get<UsersService>(UsersService);
//   });

//   // beforeEach(() => {
//   //   usersService = new UserService(new UserRepository(UserModule as any));
//   // });

//   it('should be defined', () => {
//     expect(usersService).toBeDefined();
//   });

//   //   describe('findOne', () => {
//   //     it('should retrieve a user by id', async () => {
//   //       const userId = '1' /* Provide an existing user id */;
//   //       const expectedUser = { id: 1, name: 'John Doe' }

//   //       const user = await usersService.getById(id);

//   //       jest.spyOn(usersService, 'findOne').mockImplementation(() => expectedUser);

//   //       expect(user).toBeDefined();
//   //       expect(user.id).toEqual(userId);
//   //     });

//   //     it('should return null when user does not exist', async () => {
//   //       const userId = /* Provide a non-existing user id */;

//   //       const user = await service.getUser(userId);

//   //       expect(user).toBeNull();
//   //     });
//   //   })
// });
