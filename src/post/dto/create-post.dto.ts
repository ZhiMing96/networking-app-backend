import { Uuid } from 'src/utils/types';
import { VisibilityTypes } from '../entities/post.entity';
import { CreateTargetGroup } from './create-target-group.dto';

export class CreatePostDto {
  content: string;
  userId: Uuid;
  visibility: VisibilityTypes;
  tags: string[];
  targetGroups: CreateTargetGroup[];
  imageUrl?: string;
}
