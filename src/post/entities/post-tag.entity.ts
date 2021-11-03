import { Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class PostTag {
  @PrimaryColumn()
  name: string;
}
