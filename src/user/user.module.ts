import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserRepository } from './repositories/user.repository';
import { JwtStrategy } from './jwt.strategy';
import { UserController } from './controllers/user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

// @Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    PassportModule,
    JwtModule.registerAsync({
      // inject: [ConfigService],
      // imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: process.env['SECRET_KEY'],
        // secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: process.env['EXPIRES_IN'],
        },
      }),
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [UserService, AuthService, UserRepository, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
