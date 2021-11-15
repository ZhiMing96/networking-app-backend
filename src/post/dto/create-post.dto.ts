import { Uuid } from 'src/utils/types';
import { VisibilityTypes } from '../entities/post.entity';
import { CreateTargetExpertiseDto } from './create-target-expertise.dto';
import { CreateTargetGroup } from './create-target-group.dto';

export class CreatePostDto {
  content: string;
  userId: Uuid;
  visibility: VisibilityTypes;
  tags: string[];
  targetGroups: CreateTargetGroup[];
  targetExpertise: CreateTargetExpertiseDto[];
  imageUrl?: string;
}
