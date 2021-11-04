import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Uuid } from 'src/utils/types';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get(':userId')
  findAllForUser(@Param('userId') userId: Uuid) {
    return this.postService.findAllForUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: Uuid) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: Uuid, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Uuid) {
    return this.postService.remove(id);
  }
}
