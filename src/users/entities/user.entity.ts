// export class User {
//   id: number;
//   username: string;
//   password: string;
//   isAdmin: boolean;
// }

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  //   @Column()
  //   price: number;
}
