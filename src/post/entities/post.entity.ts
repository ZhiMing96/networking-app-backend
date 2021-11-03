import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostTag } from './post-tag.entity';
import { PostTargetGroup } from './post-target-group.entity';

export enum VisibilityTypes {
  PUBLIC = 'PUBLIC',
  TARGETED = 'TARGETED',
  PRIVATE = 'PRIVATE',
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column('uuid')
  userId: string;

  @Column({ default: VisibilityTypes.PUBLIC })
  visibility: VisibilityTypes;

  @Column('timestamptz', { default: new Date() })
  created_at: Date;

  @Column('timestamptz', { default: new Date() })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => PostTag, { onDelete: 'SET NULL' })
  @JoinTable({ name: 'post_tags' })
  tags: PostTag[];

  @OneToMany(() => PostTargetGroup, (targetGroup) => targetGroup.post)
  targetGroups: PostTargetGroup[];
}
