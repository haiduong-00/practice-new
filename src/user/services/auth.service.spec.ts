import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repositories/user.repository';
import { UserModule } from '../user.module';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

describe('AuthService', function () {
  let auth_service: AuthService;
  beforeEach(() => {
    auth_service = new AuthService(
      new UserService(new UserRepository(UserModule as any)),
      new JwtService(),
    );
  });

  it('should be defined', () => {
    expect(auth_service).toBeDefined();
  });
});
