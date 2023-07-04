import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import db from 'common/database';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

@Schema({ collection: db.DB_CAT })
export class Cat {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
