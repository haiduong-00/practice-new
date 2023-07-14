import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserNameBanDto } from './dto/UserNameBan.dto';
import { UserManagerService } from './user-manager.service';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../roles.decorator';

@Controller('user-manager')
export class UserManagerController {
  constructor(private readonly userManagerService: UserManagerService) {}

  @Roles('admin')
  @Post('ban-user')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  // TODO: Them role Admin
  async banUser(@Body() email: UserNameBanDto) {
    // console.log(username);
    return this.userManagerService.banUser(email);
  }
}
