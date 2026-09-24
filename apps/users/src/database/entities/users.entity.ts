import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Roles } from './roles.entity';

@Entity({
  name: 'users',
  schema: 'dbo',
})
export class User extends BaseEntity {
  @Column({ unique: true })
  username!: string;

  @Column()
  email!: string;

  @ManyToMany(() => Roles, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'user_roles', schema: 'dbo' })
  role!: Roles[];

  @Column()
  password!: string;
}
