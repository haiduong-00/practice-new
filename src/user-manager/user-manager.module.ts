import { Module } from '@nestjs/common';
import { UserManagerService } from './user-manager.service';
import { UserManagerController } from './user-manager.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from '../user/repositories/user.repository';
import { UserSchema } from '../user/models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserManagerService, UserRepository],
  controllers: [UserManagerController],
})
export class UserManagerModule {}
