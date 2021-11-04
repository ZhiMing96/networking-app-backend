import { User } from 'src/user/entities/user.entity';
import { Uuid } from 'src/utils/types';
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
  id: Uuid;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column('uuid')
  userId: Uuid;

  @Column({ default: VisibilityTypes.PUBLIC })
  visibility: VisibilityTypes;

  @Column('timestamptz', { default: new Date() })
  created_at: Date;

  @Column('timestamptz', { default: new Date() })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => PostTag, { eager: true })
  @JoinTable({
    name: 'post_to_tags',
    joinColumn: {
      name: 'postId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'postTagName',
      referencedColumnName: 'name',
    },
  })
  tags: PostTag[];

  @OneToMany(() => PostTargetGroup, (targetGroup) => targetGroup.post, {
    eager: true,
  })
  targetGroups: PostTargetGroup[];
}
