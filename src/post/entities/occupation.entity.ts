import { Entity, PrimaryColumn } from 'typeorm';
import { PostTargetGroup } from './post-target-group.entity';

@Entity()
export class Occupation {
  @PrimaryColumn()
  name: string;
}
