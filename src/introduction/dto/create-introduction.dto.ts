import { Uuid } from 'src/utils/types';
import { IntroductionStatus } from '../entities/introduction.entity';

export class CreateIntroductionDto {
  message: string;
  introducedByUserId: Uuid;
  fromUserId: Uuid;
  toUserId: Uuid;
  postId?: Uuid;
}
