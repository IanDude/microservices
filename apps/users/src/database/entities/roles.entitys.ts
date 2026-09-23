import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Permissions } from './permissions.entitys';

@Entity({ name: 'roles', schema: 'dbo' })
export class Roles extends BaseEntity {
  @Column()
  name!: string;

  @ManyToMany(() => Permissions, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'role_permission', schema: 'dbo' })
  permission!: Permissions[];
}
