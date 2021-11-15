import { Uuid } from 'src/utils/types';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Industry } from '../../shared/entities/industry.entity';
import { Occupation } from '../../shared/entities/occupation.entity';
import { Post } from './post.entity';

export enum SeniorityType {
  ENTRY = 'ENTRY',
  JUNIOR = 'JUNIOR',
  MID = 'MID',
  SENIOR = 'SENIOR',
  EXECUTIVE = 'EXECUTIVE',
  SENIOR_EXECUTIVE = 'SENIOR_EXECUTIVE',
}

export enum YearsOfExp {
  ENTRY = '0-1',
  JUNIOR = '1-3',
  MID = '3-6',
  SENIOR = '5-10',
  EXECUTIVE = '10-15',
  SENIOR_EXECUTIVE = '15-25',
}

@Entity()
export class PostTargetGroup {
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @Column()
  jobTitle: string;

  @Column()
  yearsOfExp: YearsOfExp;

  @Column()
  seniority: SeniorityType;

  @Column({ nullable: false })
  postId: Uuid;

  @Column()
  occupationName: string;

  @Column()
  industryName: string;

  @ManyToOne(() => Post, (post) => post.targetGroups)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @ManyToOne(() => Occupation)
  @JoinColumn({ name: 'occupationName' })
  occupation: Occupation;

  @ManyToOne(() => Industry)
  @JoinColumn({ name: 'industryName' })
  industry: Industry;
}
