import {
  // HttpException,
  HttpStatus,
  Injectable,
  // NotFoundException,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { PostRepository } from '../repositories/post.repository';
import { PostNotFoundException } from '../exceptions/postNotFound.exception';
import { User } from 'src/user/models/user.model';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class PostService {
  // deletePost(arg0: number) {
  //   throw new Error('Method not implemented.');
  // }
  constructor(
    private readonly postRepository: PostRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async getAllPosts() {
    return this.postRepository.getByCondition({});
  }

  async getPostById(post_id: string) {
    const post = await this.postRepository.findById(post_id);
    if (post) {
      // await post
      // .populate({ path: 'user', select: '-password -refreshToken' })
      // .populate({ path: 'user', select: 'name email' })
      // .populate('categories')
      // .populate({ path: 'user', select: 'name email' })
      // .execPopulate();
      await post.populate({ path: 'user', select: '-password' });
      return post;
    } else {
      // throw new NotFoundException(post_id);    // function defaul
      throw new PostNotFoundException(post_id);
    }
    // throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async replacePost(post_id: string, data: UpdatePostDto) {
    return await this.postRepository.findByIdAndUpdate(post_id, data);
  }

  async createPost(user: User, post: CreatePostDto) {
    post.user = user._id;
    const new_post = await this.postRepository.create(post);
    if (post.categories) {
      await this.categoryRepository.updateMany(
        {
          _id: { $in: post.categories },
        },
        {
          $push: {
            posts: new_post._id,
          },
        },
      );
    }
    return new_post;
  }

  async getByCategory(category_id: string) {
    return await this.postRepository.getByCondition({
      categories: {
        $elemMatch: { $eq: category_id },
      },
    });
  }

  async getByCategories(category_ids: [string]) {
    return await this.postRepository.getByCondition({
      categories: {
        $all: category_ids,
      },
    });
  }

  async deletePost(post_id: string) {
    return await this.postRepository.deleteOne(post_id);
  }
}
