import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './models/users.model';
import { UsersRepository } from './repositories/users.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/user/jwt.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Users',
        schema: UsersSchema,
      },
    ]),
    // JwtModule.registerAsync({
    //   // imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: process.env['SECRET_KEY'],
    //     signOptions: {
    //       expiresIn: process.env['EXPIRES_IN'],
    //     },
    //   }),
    //   // inject: [ConfigService],
    // }),
    UsersModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
