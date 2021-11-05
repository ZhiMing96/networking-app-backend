import { IntroductionService } from './introduction.service';
import { IntroductionController } from './introduction.controller';
import { User } from 'src/user/entities/user.entity';
import { Introduction } from './entities/introduction.entity';
import { Post } from 'src/post/entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Introduction, Post]), UserModule],
  controllers: [IntroductionController],
  providers: [IntroductionService],
})
export class IntroductionModule {}
