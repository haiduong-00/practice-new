import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import redis from 'src/util/redis';
import { CreateUserDto, LoginUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(userDto: CreateUserDto) {
    // userDto.password = await bcypt.hash(userDto.password, 10);

    // check exists
    const userInDb = await this.userRepository.findByCondition({
      username: userDto.username,
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return this.userRepository.create(userDto);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: string) {
    return this.userRepository.findOne({ _id: id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string) {
    return this.userRepository.deleteOne(id);
    // redis.set('key', '1', 'EX', 60);
    // const exist = await redis.exists('key');
  }

  async findByLogin({ email, password }: LoginUserDto) {
    const user = await this.userRepository.findOne({
      email: email,
    });
    console.log(user);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findByEmail(email) {
    return this.userRepository.findByCondition({
      email: email,
    });
  }
}
