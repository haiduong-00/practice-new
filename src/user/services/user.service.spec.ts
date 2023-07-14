import { UserRepository } from '../repositories/user.repository';
import { UserModule } from '../user.module';
import { UserService } from './user.service';

describe('UserService', function () {
  let user_service: UserService;
  beforeEach(() => {
    user_service = new UserService(new UserRepository(UserModule as any));
  });
  it('should be defined', () => {
    expect(user_service).toBeDefined();
  });
});
