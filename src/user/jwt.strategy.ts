import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SECRET_KEY } from './config/secret';
import { AuthService } from './services/auth.service';
import redis from '../../src/util/redis';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_KEY,
      //    secretOrKey: process.env.SECRET_KEY,  phai truyen 1 bien trong user/config/secert.ts
    });
  }

  async validate({ email }) {
    //
    const user = await this.authService.validateUser(email);

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const key = `ban:${email}`;
    const exist = await redis.exists(key);
    if (exist) {
      console.log('email is banned: ', email);
      throw new ForbiddenException();
    } else return user;
  }
}
