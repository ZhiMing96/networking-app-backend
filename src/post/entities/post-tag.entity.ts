import { BeforeInsert, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class PostTag {
  @BeforeInsert()
  updateDates() {
    this.name = this.name.toLowerCase();
  }

  @PrimaryColumn()
  name: string;
}
