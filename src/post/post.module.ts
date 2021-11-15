import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostTag } from './entities/post-tag.entity';
import { Occupation } from '../shared/entities/occupation.entity';
import { PostTargetGroup } from './entities/post-target-group.entity';
import { User } from 'src/user/entities/user.entity';
import { Post } from './entities/post.entity';
import { UserModule } from 'src/user/user.module';
import { Industry } from '../shared/entities/industry.entity';
import { PostToTags } from './entities/post-to-tags.entity';
import { PostTargetExpertise } from './entities/post-target-expertise.entity';
import { Expertise } from 'src/shared/entities/expertise.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Post,
      User,
      PostTag,
      Occupation,
      PostTargetGroup,
      Industry,
      PostToTags,
      PostTargetExpertise,
      Expertise,
    ]),
    UserModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
