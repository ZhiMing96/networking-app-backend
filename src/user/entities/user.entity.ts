import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from '../../shared/entities/country.entities';
import { FriendRequest } from '../../friend-request/entities/friend-request.entity';

import { UserToFriends } from './user-to-friends.entity';
import { Post } from 'src/post/entities/post.entity';
import { Uuid } from 'src/utils/types';
import { UserExpertise } from './user-expertise.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @Column('varchar', { length: 255, nullable: true })
  firstName: string;

  @Column('varchar', { length: 255, nullable: true })
  lastName: string;

  @Column('varchar', { length: 255, unique: true })
  emailAddress: string;

  @Column({ nullable: true })
  profileImageUrl: string;

  @Column('varchar', { length: 50, nullable: true })
  shortDescription: string;

  @Column({ nullable: true })
  longDescription: string;

  @Column({ unique: true })
  username: string;

  @Column({ select: false, unique: true })
  passwordHash: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column('timestamptz', { default: new Date() })
  createdAt: string;

  @Column('timestamptz', { default: new Date() })
  updatedAt: string;

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

  @OneToMany(() => UserExpertise, (expertise) => expertise.user)
  expertise: UserExpertise[];
}
