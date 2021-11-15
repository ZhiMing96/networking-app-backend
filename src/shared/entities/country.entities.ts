import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Country {
  @PrimaryColumn()
  name: string;
}
