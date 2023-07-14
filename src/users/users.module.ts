import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';
import { UsersSchema } from './models/users.model';
import { UsersRepository } from './repositories/users.repository';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { JwtStrategy2 } from './jwt.strategy2';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Users',
        schema: UsersSchema,
      },
    ]),
    JwtModule.registerAsync({
      // imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: process.env['SECRET_KEY'],
        signOptions: {
          expiresIn: process.env['EXPIRES_IN'],
        },
      }),
      // inject: [ConfigService],
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [
    UsersService,
    UsersRepository,
    AuthService,
    JwtStrategy2, //  chỉ thêm vào khi test users.e2e, khi thêm sẽ bị xung đột(trùng) với jwt ở folder user
  ],
  // exports: [UsersService],
})
export class UsersModule {}
