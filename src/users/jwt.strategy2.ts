import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SECRET_KEY } from '../../src/user/config/secret';

@Injectable()
export class JwtStrategy2 extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_KEY,
      //    secretOrKey: process.env.SECRET_KEY,  phai truyen 1 bien trong user/config/secert.ts
    });
  }

  async validate({ email }) {
    //
    const user = await this.authService.validateUser2(email);

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
