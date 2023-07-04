import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../base.repository';
import { Users } from '../models/users.model';

@Injectable()
export class UsersRepository extends BaseRepository<Users> {
  constructor(
    @InjectModel('Users')
    private readonly userModel: Model<Users>,
  ) {
    super(userModel);
  }
}
