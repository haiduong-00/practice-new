import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles.decorator';
import { RolesGuard } from 'src/roles.guard';
import { UserNameBanDto } from './dto/UserNameBan.dto';
import { UserManagerService } from './user-manager.service';

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
