import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';
import { UserRepository } from '../repositories/user.repository';
import * as bcypt from 'bcrypt';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(userDto: CreateUserDto) {
    userDto.password = await bcypt.hash(userDto.password, 10);

    // check exists
    const userInDb = await this.userRepository.findByCondition({
      email: userDto.email,
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return this.userRepository.create(userDto);
  }

  async findByLogin({ email, password }: LoginUserDto) {
    const user = await this.userRepository.findOne({
      email: email,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const is_equal = bcypt.compareSync(password, user.password);

    if (!is_equal) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findByEmail(email) {
    return this.userRepository.findByCondition({
      email: email,
    });
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string) {
    return this.userRepository.findOne({ _id: id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: string) {
    // const condition = {
    //   _id: id,
    // };
    // return this.userRespository.deleteByCondition(condition);
    return this.userRepository.deleteOne(id);
  }
}
