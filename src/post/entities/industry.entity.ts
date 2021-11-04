import { BeforeInsert, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Industry {
  @BeforeInsert()
  updateDates() {
    this.name = this.name.toLowerCase();
  }

  @PrimaryColumn()
  name: string;
}
