import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
// import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { UsersModule } from './users/users.module';
// import { AbilityModule } from './ability/ability.module';
import { APP_GUARD } from '@nestjs/core';
// import { BanGuard } from './ban.guard';
import { UserManagerModule } from './user-manager/user-manager.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    // CatsModule,
    PostModule,
    UserModule,
    UsersModule,
    // AbilityModule,
    UserManagerModule,
  ],

  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: BanGuard,
  //   },
  // ],
})
export class AppModule {}
