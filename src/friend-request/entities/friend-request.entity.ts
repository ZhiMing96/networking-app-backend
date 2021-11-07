import { Uuid } from 'src/utils/types';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

export enum RequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

@Entity()
export class FriendRequest {
  @PrimaryColumn('uuid')
  fromUserId: Uuid;

  @PrimaryColumn('uuid')
  toUserId: Uuid;

  @Column({ default: RequestStatus.PENDING })
  status: RequestStatus;

  @Column()
  comment: string;

  @Column('timestamptz', { default: new Date() })
  createdAt: string;

  @Column('timestamptz', { default: new Date() })
  updatedAt: string;

  @ManyToOne(() => User, (user) => user.friendRequestsGiven)
  @JoinColumn({ name: 'fromUserId' })
  fromUser: User;

  @ManyToOne(() => User, (user) => user.friendRequestsReceived)
  @JoinColumn({ name: 'toUserId' })
  toUser: User;
}
