import { Uuid } from 'src/utils/types';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserToFriends {
  @PrimaryColumn()
  initiatorId: Uuid;

  @PrimaryColumn()
  acceptorId: Uuid;

  @ManyToOne(() => User, (user) => user.friendsAdded, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'initiatorId' })
  initiator: User;

  @ManyToOne(() => User, (user) => user.friendsRequested, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'acceptorId' })
  acceptor: User;
}
