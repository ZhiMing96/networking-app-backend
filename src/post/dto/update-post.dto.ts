import { PartialType } from '@nestjs/mapped-types';
import { PostTargetExpertise } from '../entities/post-target-expertise.entity';
import { PostTargetGroup } from '../entities/post-target-group.entity';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  targetGroups: PostTargetGroup[];
  targetExpertise: PostTargetExpertise[];
}
