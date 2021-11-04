import { Uuid } from 'src/utils/types';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class PostToTags {
  @PrimaryColumn()
  postId: Uuid;

  @PrimaryColumn()
  postTagName: string;
}
