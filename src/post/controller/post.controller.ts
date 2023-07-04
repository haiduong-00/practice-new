import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
// import { UserDocument } from 'src/users/entities/user.entity';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { PostService } from '../services/post.service';

@Controller('post')
@ApiTags('post') // swagger
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPost() {
    // @Query() often use @Get() or @Detele()
    return this.postService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createPost(@Req() req: any, @Body() post: CreatePostDto) {
    // @Body() often use @Get() or @Put()
    return this.postService.createPost(req.user, post);
  }

  @Put(':id')
  async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postService.replacePost(id, post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    await this.postService.deletePost(id);
    return true;
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('user/all')
  // async getPostUser(@Req() req: any) {
  //   const u = req.user as UserDocument;
  //   const res = await u.populate('posts');
  //   return res;
  //   return req.user;
  // }
  @UseGuards(AuthGuard('jwt'))
  @Get('user/all')
  async getPostUser(@Req() req: any) {
    await req.user
      .populate({
        path: 'posts',
        // select: 'title',
      })
      .execPopulate();
    return req.user.posts;
  }

  @Get('get/category')
  async getByCategory(@Query('category_id') category_id) {
    return await this.postService.getByCategory(category_id);
  }

  @Get('get/categories')
  async getByCategories(@Query('category_ids') category_ids) {
    return await this.postService.getByCategories(category_ids);
  }
}
