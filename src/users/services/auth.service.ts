import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { LoginUserDto } from '../dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(LoginUserDto: LoginUserDto) {
    // const user = await this.userService.findByLogin(LoginUserDto);
    // return {
    //   email: user.email,
    // };
  }
}
