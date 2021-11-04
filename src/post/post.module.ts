import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostTag } from './entities/post-tag.entity';
import { Occupation } from './entities/occupation.entity';
import { PostTargetGroup } from './entities/post-target-group.entity';
import { User } from 'src/user/entities/user.entity';
import { Post } from './entities/post.entity';
import { UserModule } from 'src/user/user.module';
import { Industry } from './entities/industry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Post,
      User,
      PostTag,
      Occupation,
      PostTargetGroup,
      Industry,
    ]),
    UserModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
