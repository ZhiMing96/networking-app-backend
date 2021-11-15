import { Expertise } from 'src/shared/entities/expertise.entity';
import { Uuid } from 'src/utils/types';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserExpertise {
  @PrimaryColumn('uuid')
  userId: Uuid;

  @PrimaryColumn('uuid')
  expertiseName: string;

  @Column()
  yearsOfExp: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Expertise)
  @JoinColumn({ name: 'expertiseName' })
  expertise: Expertise;
}
