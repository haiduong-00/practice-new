import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import db from 'common/database';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat, CatDocument } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(@InjectModel(db.DB_CAT) private catModel: Model<CatDocument>) {}

  create(createCatDto: CreateCatDto) {
    return this.catModel.create(createCatDto);
    return 'This action adds a new cat';
  }

  // async findAll() {
  //   // return `This action returns all cats`;
  //   const doc = await this.catModel.findOne();
  // }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: number): Promise<Cat> {
    // return `This action returns a #${id} cat`;
    return this.catModel.findOne({ _id: id }).exec();
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
