import { Uuid } from 'src/utils/types';
import {
  SeniorityType,
  YearsOfExp,
} from '../entities/post-target-group.entity';

export class CreateTargetGroup {
  occupationName: string;
  jobTitle?: string;
  yearsOfExp?: YearsOfExp;
  seniority?: SeniorityType;
  industryName?: string;
}
