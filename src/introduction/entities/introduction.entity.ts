import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Uuid } from 'src/utils/types';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum IntroductionStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

@Entity()
export class Introduction {
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @Column()
  message: string;

  @Column({ default: IntroductionStatus.PENDING })
  status: IntroductionStatus;

  @Column()
  introducedByUserId: Uuid;

  @Column()
  fromUserId: Uuid;

  @Column()
  toUserId: Uuid;

  @Column({ nullable: true })
  postId: Uuid;

  @Column('timestamptz', { default: new Date() })
  createdAt: string;

  @Column('timestamptz', { default: new Date() })
  updatedAt: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'introducedByUserId' })
  introducedByUser: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'fromUserId' })
  fromUser: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'toUserId' })
  toUser: User;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'postId' })
  post: Post;
}
