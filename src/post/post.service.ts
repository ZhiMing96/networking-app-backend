import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Uuid } from 'src/utils/types';
import { Connection, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostTag } from './entities/post-tag.entity';
import { PostTargetGroup } from './entities/post-target-group.entity';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    private connection: Connection,
    private userService: UserService,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(PostTag) private postTagsRepository: Repository<PostTag>,
    @InjectRepository(PostTargetGroup)
    private postTargetGroupsRepository: Repository<PostTargetGroup>,
  ) {}
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const user = await this.userService.userExists(createPostDto.userId);
    if (!user) throw new NotFoundException('User not found');
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const postTagNames = createPostDto.tags;
      const processedTagNames = postTagNames.map((name) =>
        this.postTagsRepository.create({ name }),
      );
      const savedTags = await queryRunner.manager.save(processedTagNames);

      const newPost = this.postRepository.create({
        content: createPostDto.content,
        imageUrl: createPostDto.imageUrl,
        userId: createPostDto.userId,
        visibility: createPostDto.visibility,
        tags: savedTags,
      });
      let savedPost = await queryRunner.manager.save(newPost);

      const newTargetGroups = createPostDto.targetGroups.map((group) =>
        this.postTargetGroupsRepository.create({
          ...group,
          occupationName: group.occupationName.toLowerCase(),
          industryName: group.industryName.toLowerCase(),
          postId: savedPost.id,
        }),
      );
      const savedTargetGroups = await queryRunner.manager.save(newTargetGroups);
      savedPost.targetGroups = savedTargetGroups;
      savedPost = await queryRunner.manager.save(savedPost);
      await queryRunner.commitTransaction();
      return savedPost;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.error(err);
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAllForUser(userId: Uuid): Promise<Post[]> {
    const user = await this.userService.userExists(userId);
    if (!user) throw new NotFoundException('User not found');
    return await this.postRepository.find({ userId });
  }

  async findOne(id: Uuid): Promise<Post> {
    return await this.postRepository.findOne({ id });
  }

  async update(id: Uuid, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne({ id });
    if (!post) throw new NotFoundException('Post not found');
    return await this.postRepository.update(id, {
      content: updatePostDto.content,
      imageUrl: updatePostDto.imageUrl,
      userId: updatePostDto.userId,
      visibility: updatePostDto.visibility,
    });
  }

  async remove(id: Uuid) {
    return await this.postRepository.delete({ id });
  }
}
