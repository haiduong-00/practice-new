import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/repositories/user.repository';
import redis from 'src/util/redis';
import { UserNameBanDto } from './dto/UserNameBan.dto';

@Injectable()
export class UserManagerService {
  constructor(private readonly userRespository: UserRepository) {}

  private getKey(email: string) {
    return `ban:${email}`;
  }

  async banUser(dto: UserNameBanDto) {
    // TODO: ban user using redis
    const existUser = await this.userRespository.findOne({
      email: dto.email,
    });
    console.log('dt:', dto);
    // console.log('existUser:', existUser);
    if (existUser) {
      const key = this.getKey(dto.email);
      await redis.set(key, '1', 'EX', 20);
    }

    // TODO: neu thang user ton tai key thi throw new ForbiddenException();
    // TODO: phai danh dau email truyen len
    const key = `ban:${dto.email}`;
    console.log('KEY:', key);
    const exist = await redis.exists(key);
    console.log('EXIST:', exist);
  }
}
