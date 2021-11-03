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
  fromUserId: string;

  @PrimaryColumn('uuid')
  toUserId: string;

  @Column({ default: RequestStatus.PENDING })
  status: RequestStatus;

  @Column()
  comment: string;

  @Column('timestamptz', { default: new Date() })
  created_at: Date;

  @Column('timestamptz', { default: new Date() })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.friendRequestsGiven)
  @JoinColumn({ name: 'fromUserId' })
  fromUser: User;

  @ManyToOne(() => User, (user) => user.friendRequestsReceived)
  @JoinColumn({ name: 'toUserId' })
  toUser: User;
}
