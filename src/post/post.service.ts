import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private userService: UserService,
  ) {}
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const user = await this.userService.userExists(createPostDto.userId);
    if (!user) throw new NotFoundException('User not found');
    const newPost = this.postRepository.create(createPostDto);
    return this.postRepository.save(newPost);
  }

  async findAllForUser(userId: string): Promise<Post[]> {
    const user = await this.userService.userExists(userId);
    if (!user) throw new NotFoundException('User not found');

    return await this.postRepository.find({ userId });
  }

  async findOne(id: string): Promise<Post> {
    return await this.postRepository.findOne({ id });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne({ id });
    if (!post) throw new NotFoundException('Post not found');
    return await this.postRepository.update(id, updatePostDto);
  }

  async remove(id: string) {
    return await this.postRepository.delete({ id });
  }
}
