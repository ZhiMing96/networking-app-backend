import { IntroductionStatus } from '../entities/introduction.entity';

export class UpdateIntroductionDto {
  message: string;
  status: IntroductionStatus;
}
