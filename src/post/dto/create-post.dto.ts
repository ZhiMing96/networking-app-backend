import { VisibilityTypes } from '../entities/post.entity';

export class CreatePostDto {
  id: string;
  content: string;
  imageUrl?: string;
  userId: string;
  visibility: VisibilityTypes;
}
