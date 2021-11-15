import { Expertise } from 'src/shared/entities/expertise.entity';
import { Uuid } from 'src/utils/types';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class PostTargetExpertise {
  @PrimaryColumn('uuid')
  postId: Uuid;

  @PrimaryColumn()
  expertiseName: string;

  @Column()
  minYearsOfExp: number;

  @Column()
  maxYearsOfExp: number;

  @Column({ nullable: true })
  isProfessional: boolean;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @ManyToOne(() => Expertise)
  @JoinColumn({ name: 'expertiseName' })
  expertise: Expertise;
}
