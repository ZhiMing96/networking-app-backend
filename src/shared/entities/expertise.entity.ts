import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Expertise {
  @PrimaryColumn()
  name: string;
}
