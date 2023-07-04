import { Module } from '@nestjs/common';
import { UserManagerService } from './user-manager.service';
import { UserManagerController } from './user-manager.controller';
import { UserRepository } from 'src/user/repositories/user.repository';
import { UserSchema } from 'src/user/models/user.model';
import { MongooseModule } from '@nestjs/mongoose';

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
