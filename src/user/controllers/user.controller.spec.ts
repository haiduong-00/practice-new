import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { UserModule } from '../user.module';
import { UserController } from './user.controller';

describe('UserController', function () {
  let userController: UserController;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(new UserRepository(UserModule as any));
    userController = new UserController(userService);
  });

  describe('findOne', () => {
    it('shout return an array of id, username, password', async () => {
      //   const;
    });
  });
});
