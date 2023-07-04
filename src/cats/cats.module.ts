import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './entities/cat.entity';
import db from 'common/database';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: db.DB_CAT, schema: CatSchema }]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
