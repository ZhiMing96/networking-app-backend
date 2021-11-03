import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Occupation } from './occupation.entity';
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
  id: string;

  @Column()
  title: string;

  @Column()
  yearsOfExp: YearsOfExp;

  @Column()
  seniority: SeniorityType;

  @ManyToOne(() => Post, (post) => post.targetGroups)
  post: Post;

  @ManyToOne(() => Occupation)
  occupation: Occupation;
}
