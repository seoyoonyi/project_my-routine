import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Routine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  date: string;
}
