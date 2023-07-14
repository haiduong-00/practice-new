import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../dto/create-user.dto';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(LoginUserDto: LoginUserDto) {
    const user = await this.usersService.findByLogin(LoginUserDto);
    const token = this._createToken(user);
    return {
      email: user.email,
      ...token,
    };
  }

  private _createToken({ email }): any {
    const accessToken = this.jwtService.sign({ email });
    // console.log('aaaa');

    return {
      expiresIn: process.env.EXPIRES_IN,
      accessToken,
    };
  }

  async validateUser2(email) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid tokennn', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
