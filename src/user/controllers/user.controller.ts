import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles.decorator';
import { RolesGuard } from 'src/roles.guard';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Roles('admin')
  @Get('profile')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req: any) {
    return req.user;
  }

  @Post()
  // @Roles('admin')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles('admin')
  @Get('all')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.userService.findAll();
  }

  // @Roles('admin')
  @Patch(':id')
  // @UseGuards(RolesGuard)
  // @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Roles('admin')
  @Delete(':id')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
