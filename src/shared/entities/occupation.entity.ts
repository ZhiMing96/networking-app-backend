import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Occupation {
  @PrimaryColumn()
  name: string;
}
