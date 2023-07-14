import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { LoginUserDto } from '../dto/create-user.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login2')
  async login(@Body() loginUserDto: LoginUserDto) {
    // console.log(loginUserDto);
    return await this.authService.login(loginUserDto);
  }
}
