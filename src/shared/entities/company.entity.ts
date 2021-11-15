import { Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Industry } from './industry.entity';

@Entity()
export class Company {
  @PrimaryColumn()
  name: string;

  @ManyToMany(() => Industry)
  industries: Industry[];
}
