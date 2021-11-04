import { Uuid } from 'src/utils/types';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { PostTag } from './post-tag.entity';
import { Post } from './post.entity';

@Entity({ name: 'post_to_tags' })
export class PostToTags {
  @PrimaryColumn()
  postId: Uuid;

  @PrimaryColumn()
  postTagName: string;

  @ManyToOne(() => Post, (post) => post.tags)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @ManyToOne(() => PostTag)
  @JoinColumn({ name: 'postTagName' })
  tag: PostTag;
}
