import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from './country.entities';
import { FriendRequest } from '../../friend-request/entities/friend-request.entity';

import { UserToFriends } from './user-to-friends.entity';
import { Post } from 'src/post/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  firstName: string;

  @Column('varchar', { length: 255 })
  lastName: string;

  @Column('varchar', { length: 255 })
  emailAddress: string;

  @Column()
  profileImageUrl: string;

  @Column('varchar', { length: 50 })
  shortDescription: string;

  @Column()
  longDescription: string;

  @Column('timestamptz', { default: new Date() })
  created_at: Date;

  @Column('timestamptz', { default: new Date() })
  updated_at: Date;

  @ManyToOne(() => Country)
  @JoinColumn()
  basedIn: Country;

  @OneToMany(() => FriendRequest, (request) => request.fromUser)
  friendRequestsGiven: FriendRequest[];

  @OneToMany(() => FriendRequest, (request) => request.toUser)
  friendRequestsReceived: FriendRequest[];

  @OneToMany(() => UserToFriends, (friend) => friend.initiator)
  friendsAdded: UserToFriends[];

  @OneToMany(() => UserToFriends, (friend) => friend.acceptor)
  friendsRequested: UserToFriends[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
