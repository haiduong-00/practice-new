import { AuthService } from '../services/auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    authService = new AuthService(null, null);
    authController = new AuthController(authService);
  });

  test('should be defined', () => {
    expect(authController).toBeDefined();
  });
});
